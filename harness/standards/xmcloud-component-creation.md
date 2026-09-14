# XM Cloud Component Creation Standard

## Source

This standard is derived from the Sitecore Accelerate Cookbook recipe for creating new components in XM Cloud:

`https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/developer-experience/creating-new-components`

Use this document as the authoritative reference during CMS Configuration Guide generation. The live URL above may be consulted to verify whether this document is current, but the guide must be generated from the content here — not from a live web fetch on each run.

---

## Component Type Decision

Before cloning, determine whether the component requires a dedicated datasource item:

| Scenario | Source Rendering to Clone |
|----------|--------------------------|
| Component reads authored content from a datasource item (fields on a template) | **Promo** |
| Component has no authored content (layout only, or content embedded in page fields) | **PageContent** |

Source rendering paths:

- **Promo** (with datasource): `/sitecore/layout/Renderings/Feature/JSS Experience Accelerator/Page Content/Promo`
- **PageContent** (without datasource): `/sitecore/layout/Renderings/Feature/JSS Experience Accelerator/Page Content/PageContent`

---

## Clone Rendering — Step-by-Step

1. Open the **Content Editor** and navigate to the source rendering item (Promo or PageContent as determined above).

2. Right-click the rendering item and select **Scripts → Clone Rendering**.

3. In the Clone Rendering dialog:
   - **Component Name**: enter the new component name (PascalCase, no spaces — e.g. `HeroBanner`)
   - **Module**: select the target project-layer module under the Feature or Project layer

4. Switch to the **Parameters** tab:
   - Change the option from **Inheritance** to **Create Copy**

5. Switch to the **Datasource** tab:
   - Change the option from **Inheritance** to **Create Copy**

   > **Critical**: Both Parameters and Datasource tabs must be set to **Create Copy**. Never leave either on Inheritance. A rendering on Inheritance shares its datasource template and rendering parameters with the source rendering, causing field conflicts that are difficult to debug.

6. Click **Proceed**.

---

## Items Created by Clone Rendering

The Clone Rendering script automatically creates the following items. Record their GUIDs after creation — they are required for subsequent configuration steps.

### Rendering Definition Item

**Path:** `/sitecore/layout/Renderings/{Layer}/{Module}/{ComponentName}`  
**Template:** JSON Rendering (`{04646A89-996F-4EE7-878A-FFDBF1F0EF0D}`)

Auto-populated fields:

| Field | Value set by script |
|-------|-------------------|
| `Component Name` | Set to the component name entered in the dialog |
| `Datasource Location` | `query:$site/*[@@name='Data']/*[@@templatename='{ComponentName}']` (approximate — verify and update) |
| `Datasource Template` | Path to the new datasource template created by the script |

### Datasource Template

**Path:** `/sitecore/templates/{Layer}/{Module}/{ComponentName}`

Pre-populated with the fields from the source rendering's datasource template. These must be updated to match the actual component fields — see **Post-Clone Configuration** below.

Standard values item is created automatically at:
`/sitecore/templates/{Layer}/{Module}/{ComponentName}/__Standard Values`

### Datasource Folder Template

**Path:** `/sitecore/templates/{Layer}/{Module}/{ComponentName} Folder`

Used as the insert option on the site Data folder, so the developer can create new datasource items from within the correct folder.

### Rendering Parameters Template

**Path:** `/sitecore/templates/{Layer}/{Module}/Rendering Parameters/{ComponentName}`

Controls the available rendering parameters (Grid Parameters, Styles, etc.) exposed in Pages.

---

## Post-Clone Configuration

After the script completes, the following updates are required before the guide can be executed:

### 1. Update Datasource Template Fields

The cloned datasource template contains the source rendering's fields (e.g. the Promo template has Title, Text, Link, Image). Replace these with the fields the new component actually reads from its datasource.

For each field in the new component:

| Action | Detail |
|--------|--------|
| Remove fields not used by the component | Delete or leave unused Promo fields if not needed |
| Rename fields to match component implementation | Field names must match the JSS `fields` object keys exactly |
| Set the correct field type | See JSS Field Type Mappings below |
| Set `Source` for Multilist / Treelist fields | Use `$site`-relative query syntax — see Datasource Location Queries below |

### 2. Update Rendering Definition Fields

After the template fields are correct, verify these fields on the rendering item:

| Field | Expected Value |
|-------|---------------|
| `Component Name` | Must match exactly the name used in the Next.js component map |
| `Datasource Location` | See Datasource Location Queries below |
| `Datasource Template` | Path to the (now-updated) datasource template |

### 3. Create the Data Folder Content Item

Create a folder item of the Datasource Folder Template type at the site's Data path:

`/sitecore/content/{SiteCollection}/{SiteName}/Data/{ComponentName}`

This is where authors will create datasource items. Without it, the Datasource Location query returns no results.

---

## Datasource Location Queries

The `Datasource Location` field on the rendering item controls where the Pages editor looks for datasource items when an author adds the component.

### Standard Pattern (single-folder)

```
query:$site/*[@@name='Data']/*[@@templatename='{ComponentName}']
```

This returns items of the datasource template inside `{SiteName}/Data/{ComponentName}`.

The `$site` token resolves to the content root of the current site. Always use `$site` — never hard-code the full path.

### Pattern with Spaces in Folder Name

If the Data subfolder name contains spaces, wrap it in `#` delimiters:

```
query:$site/*[@@name='Data']/*[@@name='#My Component#']/*[@@templatename='{ComponentName}']
```

Apply `#` wrapping to any path segment that contains spaces. Without it, the XPath parser fails silently and the picker shows no items.

### Recommendation: Replace `@@templatename` with `@@templateid` after creation

`@@templatename` is acceptable during initial setup (before the template GUID is known). Once the datasource template has been created and its GUID is recorded, replace the query with:

```
query:$site/*[@@name='Data']/*[@@templateid='{TEMPLATE-GUID}']
```

`@@templateid` is the production-safe alternative — template display names are not globally unique.

---

## Making the Component Available in Pages

After the rendering definition item exists, register it in the site's Available Renderings so it appears in the Pages component picker.

1. Navigate to: `/sitecore/content/{SiteCollection}/{SiteName}/Presentation/Available Renderings`

2. If a collection item for this module already exists (e.g. "Feature — Page Content"), open it. Otherwise, create a new item:
   - **Insert template**: `Available Renderings` (not "JSON Rendering collection item" or any other type)
   - **Name**: the module group name (e.g. the feature area or project name)

3. Open the collection item and add the rendering definition item to the **Renderings** field.

---

## Headless Variants

Headless Variants allow multiple visual presentations of the same component without changing the datasource.

### Creating a Default Variant

1. Navigate to: `/sitecore/content/{SiteCollection}/{SiteName}/Presentation/Headless Variants`

2. Create a folder item named after the component (e.g. `HeroBanner`).

3. Inside that folder, create a variant definition item named `Default`.

4. In the Next.js application, the component's `.tsx` file must export a named function `Default` (not a default export) that renders the variant. Additional variants are additional named exports.

---

## Component TypeScript Structure

All components must follow this structure:

```tsx
// 1. Imports
import { Field, ImageField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';

// 2. Fields interface — one property per datasource template field
interface Fields {
  Title: Field<string>;
  Description: RichTextField;
  Image: ImageField;
  Link: LinkField;
}

// 3. Props type — always includes params and fields
type ComponentNameProps = {
  params: { [key: string]: string };
  fields: Fields;
};

// 4. Default fallback for missing datasource (optional but recommended)
const ComponentNameDefaultComponent = (props: ComponentNameProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">[ComponentName]</div>
  </div>
);

// 5. Named export — must be `Default` to support Headless Variants
export const Default = (props: ComponentNameProps): JSX.Element => {
  if (!props.fields) return <ComponentNameDefaultComponent {...props} />;
  return (
    <div className={`component component-name ${props.params.styles}`}>
      {/* component markup */}
    </div>
  );
};
```

> **Naming rule**: Export as `Default` (named export), not `export default`. This is required for Headless Variants to work. Do not use `export default function ComponentName`.

---

## JSS Field Type Mappings

| Sitecore Field Type | JSS TypeScript Type | JSS Render Component |
|--------------------|--------------------|--------------------|
| Single-Line Text | `Field<string>` | `<Text field={props.fields.Title} />` |
| Multi-Line Text | `Field<string>` | `<Text field={props.fields.Title} />` |
| Rich Text | `RichTextField` | `<RichText field={props.fields.Body} />` |
| Image | `ImageField` | `<Image field={props.fields.Image} />` |
| General Link | `LinkField` | `<Link field={props.fields.Link} />` |
| Date | `DateField` | `<Date field={props.fields.Date} />` |
| File | `FileField` | `<File field={props.fields.File} />` |
| Integer / Number | `Field<number>` | `<Text field={props.fields.Count} />` |
| Checkbox | `Field<boolean>` | `{props.fields.IsActive?.value && <span>...</span>}` |
| Treelist / Multilist | `Item[]` | map over `props.fields.Items` |

---

## Component Registration

After cloning the rendering and updating the `.tsx` file, register the component in the Next.js component map.

In this project the preferred method is the `sitecore-tools` generation flow. Do not create a manual mapping. If `sitecore-tools` is not available, add the component to the existing component factory file using the same pattern as adjacent entries.

---

## Summary — Items Required per Component

The table below lists the minimum set of items the Clone Rendering script creates or that must be manually created for a standard component with a datasource.

| # | Item Type | Path Pattern |
|---|-----------|-------------|
| 1 | Rendering Definition (JSON Rendering) | `/sitecore/layout/Renderings/{Layer}/{Module}/{ComponentName}` |
| 2 | Datasource Template | `/sitecore/templates/{Layer}/{Module}/{ComponentName}` |
| 3 | Datasource Folder Template | `/sitecore/templates/{Layer}/{Module}/{ComponentName} Folder` |
| 4 | Rendering Parameters Template | `/sitecore/templates/{Layer}/{Module}/Rendering Parameters/{ComponentName}` |
| 5 | Available Renderings collection (if new) | `/sitecore/content/{SiteCollection}/{Site}/Presentation/Available Renderings/{Collection}` |
| 6 | Data folder content item | `/sitecore/content/{SiteCollection}/{Site}/Data/{ComponentName}` |
| 7 | Headless Variant — Default | `/sitecore/content/{SiteCollection}/{Site}/Presentation/Headless Variants/{ComponentName}/Default` |
| 8 | Placeholder Settings (if new placeholder) | `/sitecore/layout/Placeholder Settings/Project/{Site}/{placeholder-name}` |
