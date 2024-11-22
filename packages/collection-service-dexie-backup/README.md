# facts-db-backup

A TRPC service to allow Facts DB backup/restore using google drive

- backup indexeddb on google drive
- store at most 3 most recent backups, to minimize data lose due to corrupt backups
- restore latest available backup from google drive
- lock restore while backing up

---

##### Required Scopes

- https://www.googleapis.com/auth/drive.appdata
- https://www.googleapis.com/auth/drive.appfolder
