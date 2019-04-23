# Use LWC in Flows
Soon LWC would be supported in Flows. Here's something you could use in the meantime. The idea is to use this framework so that lack of Flow support doesn't stop you from switching to LWC from aura. When Salesforce adds support for LWC in flows, the expecation is that you switch to that model, with minimal changes to the LWCs you build using this framework.

## Steps
Once you push the source to your org, assign yourself the 'lwcflow' permset

#### sfdx force:user:permset:assign -n lwcflow

On your flow screens add the "flowcontainer" aura component and provide the name of your LWC as an argument, along with any input data, output data and a variable to save and restore the component state for when users move back and forth between screens. Remove the default footer, and indicate the buttons you'd like to see on the screen by passing in boolean values as parameters.

In your LWC, extend 'Lwcflowbridge' class instead of 'LightningElement'. In the 'connectedCallback' method, invoke the 'initLwcBridge' method. Override the 'handleNavigation' method to process and return any output data. Note that this is an async method and can wait for asynchronous methods to finish executing before moving to a different screen. Refer to 'lwcFlowScreen' for the rest of the details on how to implement an LWC screen for your flow.

## Features

- Ability to pass in input data and retrieve output data from the LWC
- Ability to store and restore state of the LWC for when users move back and forth between screens
- Error handling

## Note

If you're storing and restoring component states, ensure that you pass in the same variable as both input and output in your flow screen for the 'LWC State' parameter. https://developer.salesforce.com/docs/atlas.en-us.salesforce_vpm_guide.meta/salesforce_vpm_guide/vpm_designer_screen_components_previous.htm
