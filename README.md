# Deals Case Study

This project is the implementation of the case study as defined in the PDF.

## Notes/changes to spec

I've made sure first and foremost to meet all the requirements outlined in the spec.

However, I felt like the grid was way too crowded by default at pretty much any screen size but the widest, so I introduced a couple ways to make things fit a bit nicer:

1. Added a `defaultHiddenColumns` prop to the table model so columns can be hidden by default (in this case: `bloomberg_id`, `analysts`, `doc_count`, and `custom_deal_identifiers` ).
2. Added a `ToggleColumns` component that allows the user to toggle the display of each column, so they can choose which columns to display.
3. Added a `displayFormatFunction` to the table column model to allow long values to be easily truncated or otherwise formatted.

I also added a series of buttons to clear/reset the current sort/filter/selection settings.

## Link to deployed app: [vercel app link here]()

## Requirements

You'll need NPM installed locally to use this project.

## Start the project

To start the project, you'll need to install dependencies and start the server.

### Install dependencies

```sh
npm install
```

### Start server

```sh
npm run dev
```

## Component Tests

This project includes 100% component/unit test coverage for the components and utils directories.

All of these tests will run with the following command:

```sh
npm run test
```

## Mock data

This app includes mock data in denominations of 10/50/100/500/1000 rows.

The app will use the 50-row mock data file by default.

If you'd like to load a different mock data file, update the import and the `tableData` prop in `src/App.vue`.

If you'd like to load mock data with a different shape, you'll likely need to create a new `TableModel` and update `src/App.vue` to pass it through the `tableModel` prop.
