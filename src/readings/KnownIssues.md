## Known issues

### Deleting storage link

* You need to have occi-infra on your server. The following link will post a compute resource, a storage and a linkstorage: %{
  "label": "click",
  "post": [
    {
        "adress": "/categories/compute",
        "datas": {
          "attributes": {
            "occi.compute.hostname" : "test",
            "occi.compute.state" : "inactive"
          },
          "id": "6df690d2-3158-40c4-88fb-d1c41584d6e5"
        }
    },
    {
        "adress": "/categories/storage",
        "datas": {
          "attributes": {
            "occi.storage.size" : 1000
          },
          "id": "6df690d2-3158-40c4-88fb-d1c41584d6e6"
        }
    },
    {
      "adress": "/categories/storagelink",
      "datas": {
         "kind":"www.schemas.ogf.org/occi/infrastructure#storagelink",
         "attributes": {
           "occi.core.id":"6df690d2-3158-40c4-88fb-d1c41584d6e7",
           "occi.storagelink.deviceid":"/dev/vdc"
         },
         "target": {
           "location": "6df690d2-3158-40c4-88fb-d1c41584d6e6"
         },
         "source": {
           "location": "6df690d2-3158-40c4-88fb-d1c41584d6e5"
         }
      }
    }
  ]
}%


* You can then check if this resources has been created : [/categories/compute](/categories/compute), [/categories/storage](/categories/storage), [/categories/storagelink](/categories/storagelink).

* Now delete the storagelink by clicking %{
  "label": "here",
  "del": "/6df690d2-3158-40c4-88fb-d1c41584d6e7"
}%

* Try again to access [/categories/compute](/categories/compute) or [/categories/storage](/categories/storage).
