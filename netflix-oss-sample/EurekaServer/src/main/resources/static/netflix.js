
var EurekaBox = React.createClass({

  render: function() {
    return (
      <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10 eureka-container eureka-txt img-rounded">Eureka</div>
      <div className="col-md-1"></div>
      </div>
    );
  }
});

var ServiceInstanceBox = React.createClass({
  componentWillReceiveProps: function(nextProps) {
	  console.log("Component Received Props " + this.props.serviceInstance);
      this.setState({ "serviceInstance" : nextProps.serviceInstance});
  },

  render: function() {
        var instanceHTML = "";
        if(this.state && this.state.serviceInstance){
          console.log("Will render service Instance Box");

            instanceHTML = <span>
            <div className="img-rounded full">
            <div className="container service-container img-rounded span2">
                {this.props.serviceName} <br/>
                {this.state.serviceInstance.hostName}
            </div>
            </div>
            </span> ;
        }else{
          console.log("Cannot render service Instance Box");

      }


    return (
      <div>
      {instanceHTML}
      </div>
    );
  }
});



var ServiceBox = React.createClass({
  componentWillReceiveProps: function(nextProps) {
      this.setState({ "microServices" : nextProps.microServices});
  },

  render: function() {
	    console.log( JSON.stringify(this.state, undefined, 2));
        var serviceInstancesHTML = <span></span>
        if(this.state && this.state.microServices){
            if($.isArray(this.state.microServices)){
            	_.each(this.state.microServices, function(microservice){
            		if($.isArray(microservice.instance)){
            			serviceInstancesHTML = microservice.instance.map(function(serviceInstance){
            				return (
            						<ServiceInstanceBox serviceName={microservice.name} serviceInstance={serviceInstance}  key={microservice.name + serviceInstance.hostName} />
            				)
            			});
                    }else{
                  	  console.log("Send Instance " +  microservice.instance);
                  	  serviceInstancesHTML = <ServiceInstanceBox serviceName={microservice.name} serviceInstance={microservice.instance}  />
                    }
            	});
              
            }else{
              if($.isArray(this.state.microServices.instance)){
                console.log("2 check");
              }else{
                serviceInstancesHTML = <ServiceInstanceBox serviceName={this.state.microServices.name} serviceInstance={this.state.microServices.instance} />
              }
            }

        }else{
          console.log("3 check");
        }

    return (
     <span>
      {serviceInstancesHTML}
     </span>
    );
  }
});


var ZuulBox = React.createClass({
  render: function() {
    return (
      <div  className="top-bottom-margins-s drop-shadow zuul col-md-2 img-rounded" >
      <div className="rotated-text__inner  center-align zuul-txt">
      Zuul
      </div>
      </div>

    );
  }
});



var TurbineBox = React.createClass({
  render: function() {
    return (
      <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10 turbine-container turbine-txt img-rounded">Turbine</div>
      <div className="col-md-1"></div>
      </div>
    );
  }
});

var HystrixBox = React.createClass({
  render: function() {
    return (
      <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10 hystrix-dashboard-container hystrix-dashboard-txt img-rounded">Hystrix Dashboard</div>
      <div className="col-md-1"></div>
      </div>
    );
  }
});

var OuterContainer = React.createClass({
  getInitialState: function() {
    var state = {};
    return state;
  },

  getApplicationsWithName: function(eurekaObjects, nameOfApp){
    var apps = new Array();

    if(eurekaObjects && eurekaObjects.applications && eurekaObjects.applications.application){
      var applicationsArray =  eurekaObjects.applications.application;

      if($.isArray(applicationsArray)){
        apps = _.filter(applicationsArray, function(application){
          var appExists = application.name.indexOf(nameOfApp) > -1;
          return appExists;
        });
      }else {
        if(applicationsArray.name.indexOf(nameOfApp) > -1){
          apps.push(applicationsArray);
        }
      }

    }

    return apps;
  },

  updateStateWithApp: function(eurekaObjects, appName, filterName){
    var filteredApps = this.getApplicationsWithName(eurekaObjects, filterName);
    if(filteredApps && filteredApps.length > 0 ){
      var appToBeSet = {};
      appToBeSet[appName] = filteredApps;
      this.setState(appToBeSet);
    }else {
      var appToBeSet = {};
      appToBeSet[appName] = undefined;
      this.setState(appToBeSet);    }

  },

  componentWillReceiveProps: function(nextProps) {
    var eurekaObjects = nextProps.eurekaObjects;
    this.updateStateWithApp(eurekaObjects, "zuulServer", "ZUUL");
    this.updateStateWithApp(eurekaObjects, "turbineServer", "TURBINE");
    this.updateStateWithApp(eurekaObjects, "hystrixServer", "HYSTRIX");
    this.updateStateWithApp(eurekaObjects, "microServices", "SERVICE");

  },

  render: function() {


    var zuulBox= '';
    if (this.state.zuulServer) {
      zuulBox = <ZuulBox />
    };

    var hystrixBox= '';
    if (true) {
      hystrixBox = <HystrixBox />
    };

    var turbineBox= '';
    if (this.state.turbineServer) {
      turbineBox = <TurbineBox />
    };

    var servicesBox= '';
    if (this.state.microServices) {
      servicesBox = <ServiceBox microServices={this.state.microServices} />
    };


    return (
      <div className="outer-container span10 container-fluid  img-rounded">
      <EurekaBox />
      <div className="row">
      <div className="col-md-1"></div>
      {zuulBox}
      {servicesBox}
      <div className="col-md-1"></div>
      </div>
      {turbineBox}
      {hystrixBox}
      </div>
    );
  }
});





function updateScreen(){
  var eurekaObjects  = undefined;
  var msg = $.ajax({type: "GET", url: "http://localhost:1111/eureka/apps/", async: false}).responseText;
  var x2js = new X2JS();
  var eurekaObjects = undefined;
  if(msg){
    var eurekaObjects = x2js.xml_str2json(msg);

  }


  ReactDOM.render(
    <OuterContainer eurekaObjects={eurekaObjects} />,
    document.getElementById('root-content')
  );

}

setInterval( function(){
  updateScreen();

}, 3000);

updateScreen();
