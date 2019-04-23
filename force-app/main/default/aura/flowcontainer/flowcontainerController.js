({

    
    lwcnext: function(cmp,evt){
        if(cmp.isValid()){
            let md = evt.getParam("metadata");
            // If there are multiple flows on the same page, this prevents other flows from being triggered
            if(md.containerCmpId === cmp.getGlobalId()){
                if(md.errors){
                    cmp.set("v.errors",md.errors);
                }else{
                    cmp.set("v.errors","");
                    let payload = evt.getParam("message");
                    let state = evt.getParam("state");
                    let action = md.action;

                    if(payload instanceof Object)
                        payload=JSON.stringify(payload);
                    else if(payload && payload instanceof Array)
                        payload=payload.join(",");

                    if(state && state instanceof Object)
                        state=JSON.stringify(state);
                    else if(state && state instanceof Array)
                        state=state.join(",");
                        
                    cmp.set("v.opdata",payload);
                    cmp.set("v.lwcstate",state);
                    let navigate = cmp.get("v.navigateFlow");
                    navigate(action);
                }
            }
        }
    },

    doInit: function(cmp,evt){
        let lwcname = cmp.get("v.lwcname");
        // console.log("inpdata aura "+cmp.get("v.lwcdata"))
        $A.createComponent("c:"+lwcname,{"onlwcdone":cmp.getReference("c.lwcnext"),"inpData":cmp.get("v.lwcdata"),"state":cmp.get("v.lwcstate"),"containerCmpId":cmp.getGlobalId()},(lwcmp,status,errorMessage)=>{
            if(status=="SUCCESS")
                cmp.set("v.body",lwcmp);
            else if(status=="ERROR")
                console.log("Error in creating component "+errorMessage);
        })
    }
})