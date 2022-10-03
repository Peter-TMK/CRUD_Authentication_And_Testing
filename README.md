## Performing_CRUD_operations, authenticating each http method and testing(unit and integration), using an in-memory user object as database

A non-framework minimal task for performing the CRUD operations in NodeJS.

CRUD is an acronym for the different http methods

- Create(POST)
- Read(GET)
- Update(PUT/PATCH)
- Delete(DELETE)

The authentication is done using -
- password-based
- token-based
- access control level

For Unit and Integration Test, jest and supertest were used respectively.

The unit test performs some basic mathematical opreations:

### API
- add
- sub
- mul
- pow
- div
- mean