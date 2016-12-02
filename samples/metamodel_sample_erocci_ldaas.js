{
  "actions": [
    {
      "scheme": "http://occiware.org/linkeddata/ldproject/action#",
      "term": "publish"
    },
    {
      "scheme": "http://occiware.org/linkeddata/ldproject/action#",
      "term": "unpublish"
    },
    {
      "scheme": "http://occiware.org/linkeddata/ldproject/action#",
      "term": "update"
    },
    {
      "scheme": "http://schemas.ogf.org/occi/platform/component/action#",
      "term": "start",
      "title": "Start the application."
    },
    {
      "scheme": "http://schemas.ogf.org/occi/platform/component/action#",
      "term": "stop",
      "title": "Stop the application."
    },
    {
      "scheme": "http://schemas.ogf.org/occi/infrastructure/network/action#",
      "term": "down"
    },
    {
      "scheme": "http://schemas.ogf.org/occi/infrastructure/network/action#",
      "term": "up"
    },
    {
      "attributes": {
        "method": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        }
      },
      "scheme": "http://schemas.ogf.org/occi/infrastructure/compute/action#",
      "term": "restart",
      "title": "Restart the system (graceful, warm or cold)"
    },
    {
      "attributes": {
        "method": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "name": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        }
      },
      "scheme": "http://schemas.ogf.org/occi/infrastructure/compute/action#",
      "term": "save",
      "title": "Save the system (hot, deferred)"
    },
    {
      "scheme": "http://schemas.ogf.org/occi/infrastructure/compute/action#",
      "term": "start",
      "title": "Start the system"
    },
    {
      "attributes": {
        "method": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        }
      },
      "scheme": "http://schemas.ogf.org/occi/infrastructure/compute/action#",
      "term": "stop",
      "title": "Stop the system (graceful, acpioff or poweroff)"
    },
    {
      "attributes": {
        "method": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        }
      },
      "scheme": "http://schemas.ogf.org/occi/infrastructure/compute/action#",
      "term": "suspend",
      "title": "Suspend the system (hibernate or in RAM)"
    },
    {
      "scheme": "http://schemas.ogf.org/occi/infrastructure/storage/action#",
      "term": "offline",
      "title": "Set storage offline"
    },
    {
      "scheme": "http://schemas.ogf.org/occi/infrastructure/storage/action#",
      "term": "online",
      "title": "Set storage online"
    },
    {
      "scheme": "http://schemas.ogf.org/occi/platform/application/action#",
      "term": "start",
      "title": "Start the application."
    },
    {
      "scheme": "http://schemas.ogf.org/occi/platform/application/action#",
      "term": "stop",
      "title": "Stop the application."
    }
  ],
  "kinds": [
    {
      "actions": [
        "http://schemas.ogf.org/occi/platform/application/action#start",
        "http://schemas.ogf.org/occi/platform/application/action#stop"
      ],
      "attributes": {
        "occi.app.context": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.app.name": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.app.state": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.app.state.message": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.app.url": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/application",
      "parent": "http://schemas.ogf.org/occi/core#resource",
      "scheme": "http://schemas.ogf.org/occi/platform#",
      "term": "application",
      "title": "Application"
    },
    {
      "attributes": {
        "occi.core.summary": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/resource",
      "parent": "http://schemas.ogf.org/occi/core#entity",
      "scheme": "http://schemas.ogf.org/occi/core#",
      "term": "resource",
      "title": "Core Resource"
    },
    {
      "actions": [
        "http://schemas.ogf.org/occi/infrastructure/storage/action#offline",
        "http://schemas.ogf.org/occi/infrastructure/storage/action#online"
      ],
      "attributes": {
        "occi.storage.size": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "number"
          },
          "required": true,
          "type": "number"
        },
        "occi.storage.state": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.storage.state.message": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/storage",
      "parent": "http://schemas.ogf.org/occi/core#resource",
      "scheme": "http://schemas.ogf.org/occi/infrastructure#",
      "term": "storage",
      "title": "Storage Resource"
    },
    {
      "actions": [
        "http://schemas.ogf.org/occi/infrastructure/compute/action#restart",
        "http://schemas.ogf.org/occi/infrastructure/compute/action#save",
        "http://schemas.ogf.org/occi/infrastructure/compute/action#start",
        "http://schemas.ogf.org/occi/infrastructure/compute/action#stop",
        "http://schemas.ogf.org/occi/infrastructure/compute/action#suspend"
      ],
      "attributes": {
        "occi.compute.architecture": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.compute.cores": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "number"
          },
          "required": false,
          "type": "number"
        },
        "occi.compute.hostname": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.compute.memory": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "number"
          },
          "required": false,
          "type": "number"
        },
        "occi.compute.share": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "number"
          },
          "required": false,
          "type": "number"
        },
        "occi.compute.speed": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "number"
          },
          "required": false,
          "type": "number"
        },
        "occi.compute.state": {
          "default": "inactive",
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.compute.state.message": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/compute",
      "parent": "http://schemas.ogf.org/occi/core#resource",
      "scheme": "http://schemas.ogf.org/occi/infrastructure#",
      "term": "compute",
      "title": "Compute Resource"
    },
    {
      "attributes": {
        "occi.core.id": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.core.title": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/entity",
      "scheme": "http://schemas.ogf.org/occi/core#",
      "term": "entity",
      "title": "Core Entity"
    },
    {
      "attributes": {
        "occi.ld.dblink.database": {
          "default": "datacore",
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.ld.dblink.port": {
          "default": 27017,
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "number"
          },
          "required": false,
          "type": "number"
        }
      },
      "location": "http://localhost:8080/categories/lddatabaselink",
      "parent": "http://schemas.ogf.org/occi/core#link",
      "scheme": "http://occiware.org/linkeddata#",
      "term": "lddatabaselink",
      "title": "LDDatabaseLink"
    },
    {
      "location": "http://localhost:8080/categories/componentlink",
      "parent": "http://schemas.ogf.org/occi/core#link",
      "scheme": "http://schemas.ogf.org/occi/platform#",
      "term": "componentlink",
      "title": "ComponentLink"
    },
    {
      "actions": [
        "http://schemas.ogf.org/occi/infrastructure/network/action#down",
        "http://schemas.ogf.org/occi/infrastructure/network/action#up"
      ],
      "attributes": {
        "occi.network.label": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.network.state": {
          "default": "inactive",
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.network.state.message": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.network.vlan": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "number"
          },
          "required": false,
          "type": "number"
        }
      },
      "location": "http://localhost:8080/categories/network",
      "parent": "http://schemas.ogf.org/occi/core#resource",
      "scheme": "http://schemas.ogf.org/occi/infrastructure#",
      "term": "network",
      "title": "Network Resource"
    },
    {
      "attributes": {
        "occi.core.source": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.core.source.kind": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.core.target": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.core.target.kind": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/link",
      "parent": "http://schemas.ogf.org/occi/core#entity",
      "scheme": "http://schemas.ogf.org/occi/core#",
      "term": "link",
      "title": "Core Link"
    },
    {
      "attributes": {
        "occi.networkinterface.interface": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.networkinterface.mac": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.networkinterface.state": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.networkinterface.state.message": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/networkinterface",
      "parent": "http://schemas.ogf.org/occi/core#link",
      "scheme": "http://schemas.ogf.org/occi/infrastructure#",
      "term": "networkinterface",
      "title": "NetworkInterface Link"
    },
    {
      "actions": [
        "http://schemas.ogf.org/occi/platform/component/action#start",
        "http://schemas.ogf.org/occi/platform/component/action#stop"
      ],
      "attributes": {
        "occi.component.state": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.component.state.message": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/component",
      "parent": "http://schemas.ogf.org/occi/core#resource",
      "scheme": "http://schemas.ogf.org/occi/platform#",
      "term": "component",
      "title": "Component"
    },
    {
      "actions": [
        "http://occiware.org/linkeddata/ldproject/action#publish",
        "http://occiware.org/linkeddata/ldproject/action#unpublish",
        "http://occiware.org/linkeddata/ldproject/action#update"
      ],
      "attributes": {
        "occi.ld.project.lifecycle": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.ld.project.name": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.ld.project.robustness": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/ldproject",
      "parent": "http://schemas.ogf.org/occi/core#resource",
      "scheme": "http://occiware.org/linkeddata#",
      "term": "ldproject",
      "title": "LDProject"
    },
    {
      "attributes": {
        "occi.storagelink.deviceid": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.storagelink.mountpoint": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.storagelink.state": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.storagelink.state.message": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/storagelink",
      "parent": "http://schemas.ogf.org/occi/core#link",
      "scheme": "http://schemas.ogf.org/occi/infrastructure#",
      "term": "storagelink",
      "title": "StorageLink Link"
    },
    {
      "location": "http://localhost:8080/categories/ldprojectlink",
      "parent": "http://schemas.ogf.org/occi/core#link",
      "scheme": "http://occiware.org/linkeddata#",
      "term": "ldprojectlink"
    }
  ],
  "mixins": [
    {
      "applies": [
        "http://schemas.ogf.org/occi/infrastructure#compute"
      ],
      "location": "http://localhost:8080/categories/os_tpl",
      "scheme": "http://schemas.ogf.org/occi/infrastructure#",
      "term": "os_tpl",
      "title": "OS Template"
    },
    {
      "location": "http://localhost:8080/categories/tag",
      "scheme": "http://erocci.ow2.org/occi#",
      "term": "tag",
      "title": "User mixin root mixin"
    },
    {
      "applies": [
        "http://schemas.ogf.org/occi/infrastructure#compute"
      ],
      "attributes": {
        "occi.credentials.ssh.publickey": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/ssh_key",
      "scheme": "http://schemas.ogf.org/occi/infrastructure/credentials#",
      "term": "ssh_key",
      "title": "Credentials Mixin"
    },
    {
      "location": "http://localhost:8080/categories/resource_tpl",
      "scheme": "http://schemas.ogf.org/occi/infrastructure#",
      "term": "resource_tpl",
      "title": "Resource template"
    },
    {
      "applies": [
        "http://schemas.ogf.org/occi/platform#application",
        "http://schemas.ogf.org/occi/platform#component"
      ],
      "location": "http://localhost:8080/categories/res_tpl",
      "scheme": "http://schemas.ogf.org/occi/platform#",
      "term": "res_tpl",
      "title": "Resource Template"
    },
    {
      "applies": [
        "http://schemas.ogf.org/occi/infrastructure#network"
      ],
      "attributes": {
        "occi.network.address": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.network.allocation": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.network.gateway": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/ipnetwork",
      "scheme": "http://schemas.ogf.org/occi/infrastructure/network#",
      "term": "ipnetwork",
      "title": "An IP Networking Mixin"
    },
    {
      "applies": [
        "http://schemas.ogf.org/occi/infrastructure#compute"
      ],
      "attributes": {
        "occi.compute.userdata": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/user_data",
      "scheme": "http://schemas.ogf.org/occi/infrastructure/compute#",
      "term": "user_data",
      "title": "Contextualization Mixin"
    },
    {
      "applies": [
        "http://schemas.ogf.org/occi/platform#application"
      ],
      "location": "http://localhost:8080/categories/app_tpl",
      "scheme": "http://schemas.ogf.org/occi/platform#",
      "term": "app_tpl",
      "title": "Application Template"
    },
    {
      "applies": [
        "http://schemas.ogf.org/occi/platform#componentlink"
      ],
      "attributes": {
        "occi.database.token": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        },
        "occi.database.uri": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.database.username": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/databaselink",
      "scheme": "http://schemas.ogf.org/occi/platform#",
      "term": "databaselink",
      "title": "Database Link"
    },
    {
      "applies": [
        "http://schemas.ogf.org/occi/platform#component"
      ],
      "attributes": {
        "occi.database.version": {
          "mutable": false,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/database",
      "scheme": "http://schemas.ogf.org/occi/platform#",
      "term": "database",
      "title": "Database Mixin"
    },
    {
      "applies": [
        "http://schemas.ogf.org/occi/infrastructure#networkinterface"
      ],
      "attributes": {
        "occi.networkinterface.address": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.networkinterface.allocation": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": true,
          "type": "string"
        },
        "occi.networkinterface.gateway": {
          "mutable": true,
          "pattern": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "string"
          },
          "required": false,
          "type": "string"
        }
      },
      "location": "http://localhost:8080/categories/ipnetworkinterface",
      "scheme": "http://schemas.ogf.org/occi/infrastructure/networkinterface#",
      "term": "ipnetworkinterface",
      "title": "IP NetworkInterface Mixin"
    }
  ]
}

