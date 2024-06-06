const apigateway = require('aws-cdk-lib/aws-apigateway');
const { Construct } = require('constructs');

class ApiRestModule extends Construct {
  constructor(scope, id, props) {
    super(scope, id);

    // Define the API Gateway resource
    const api = new apigateway.LambdaRestApi(this, props.Name, {
        handler: props.Handler.getFunction(), 
        proxy: props.Proxy,
        deployOptions: {
          stageName: props.Stage,
        },
      });

    // Iterate over the provided resources and methods
    props.Resources.forEach((resource, index) => {
      const apiResource = api.root.addResource(resource.Path);

      resource.Methods.forEach((method) => {
        apiResource.addMethod(method);  // No need to pass props.Methods here
      });
    });
  }
}

module.exports = { ApiRestModule };
