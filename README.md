To run admin:
- Run `npm run start:ra-tool`

To lint admin:
- Run `npm run lint:ra-tool`

To build admin:
- Run `npm run build:ra-tool`

To test:
- Run `npm run test`

To add an extra lib:
- Run `yarn add ${package_name} -W`
- Run `yarn install` again to install dependencies on the needed package

Tech stack:
- React (Hooks)
- Typescript
- Material UI
  - Responsive UI: https://material-ui.com/guides/responsive-ui/
- Styled-component
- React Hook Form
- Yup (library validate)
- Redux toolkit for state management
- Redux saga for asynchronouse state management
- Monorepo using yarn workspaces
- Eslint for coding convention
- Jest for testing
- Circleci for ci/cd
- Deployment on aws s3 and cloudfront:
  - To config aws s3 with react-router
    - https://via.studio/journal/hosting-a-reactjs-app-with-routing-on-aws-s3
    - https://docs.aws.amazon.com/AmazonS3/latest/userguide/how-to-page-redirect.html

- AWS S3 endpoint for admin package:
  - http://nexus-react-boilerplate-admin.s3-website-ap-southeast-1.amazonaws.com/login

Component naming convention and import/export strategy:
  - https://bradfrost.com/blog/post/this-or-that-component-names-index-js-or-component-js/
