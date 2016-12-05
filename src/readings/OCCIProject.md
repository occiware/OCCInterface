## The OCCIware project

The aim of the OCCI project is to normalize and unify the Cloud.  
If you use the cloud today and want to change your Cloud provider, it is really painful because the way of managing the Cloud is
different depending on the provider you use.    

[OCCIware](http://www.occiware.org) is an organization working not only on an implementation of the [OCCI specifications](http://occi-wg.org/about/specification/), but also and especially tooling and runtimes for it (see [its documentation](http://occiware.github.io)). It has developed two OCCI compliant servers, named [MART](http://github.com/cgourdin/MartServer) and [Erocci](http://erocci.ow2.org),
which you can deploy on your Cloud, and which expose the REST API you are currently using through this playground.

## As a user

The idea is pretty simple : you choose a Cloud provider, you deploy your MART or Erocci server on it, you configure it with the right kinds of resources you are using
(databases, VMs, WordPress blog ...), then you can manage your resources with the REST API or with this application. Let's say after some time, you decide to change
you Cloud provider : no need to learn a new managing style of the Cloud anymore, just deploy your MART Erocci server, and you are ready to go !

... now, that's the ideal case. Alas often, Clouds are not fully compatible, if only because they provide different features - and often that's the reason why you're switching cloud providers. Well, OCCI and OCCIware have been **designed to address precisely this issue**:
- OCCI allows to keep Cloud API definitions as close as possible, thanks to flexible typing (Mixins, similar to Aspects or Scala traits)
- this API unification allows for a *learn once, write anywhere* approach (if not "write once, run anywhere")
- OCCIware provides tools for this approach, that will solve the "noodle plate" problem of your source code that has to support many clouds.
