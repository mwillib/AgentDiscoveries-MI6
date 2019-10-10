# Migration Instructions  

- The first migration `V1` should be the base schema so all clients are in sync.  
- All files should follow the file naming convention e.g. `V1__add_initial_tables.sql`.  
- The compiler reads the migrations starting from `V1`.  
- Once a file has been successfully compiled, do not alter it.  
- Instead create a new migration so the history is clear.
---