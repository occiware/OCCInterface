const compute = {
  "attributes": {
    "occi.compute.hostname" : "test",
    "occi.compute.state" : "inactive"
  },
  "id": "6df690d2-3158-40c4-88fb-d1c41584d6e5"
}

const storage = {
  "atributes": {
    "occi.storage.size" : 1000,
    "occi.storage.state": []
  },
  "id": "6df690d2-3158-40c4-88fb-d1c41584d6e6"
}


const storagelink = {
  "attributes": {
    "occi.storagelink.mountpoint": "/dev/sda1"
  },
  "id": "6df690d2-3158-40c4-88fb-d1c41584d6e7",
  "source": {
    "location": "6df690d2-3158-40c4-88fb-d1c41584d6e5"
  },
  "target": {
    "location": "6df690d2-3158-40c4-88fb-d1c41584d6e6"
  }
}

module.exports = {compute : compute, storage: storage, storagelink: storagelink}
