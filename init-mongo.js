db.createUser(
    {
        user: "root",
        pwd: "rootroot",
        roles: [
            {
                role: "readWrite",
                db: "linkapi-teste"
            }
        ]
    }
)