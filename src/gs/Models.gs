/*********************************************************************
 * Models
 *********************************************************************/

class UserModel{

  constructor(obj={}){

    this.id=obj.id||"";

    this.username=obj.username||"";

    this.employee=obj.employee||"";

    this.role=obj.role||ROLE.USER;

    this.sheet=obj.sheet||"";

    this.active=obj.active||false;

  }

}



class CustomerModel{

  constructor(obj={}){

    this.id=obj.id||"";

    this.name=obj.name||"";

    this.english=obj.english||"";

    this.phone=obj.phone||"";

    this.passport=obj.passport||"";

  }

}



class InvoiceModel{

  constructor(){

    this.id="";

    this.customerId="";

    this.employee="";

    this.status=STATUS.NEW;

    this.total=0;

    this.createdDate=new Date();

    this.items=[];

  }

}



class InvoiceItem{

  constructor(){

    this.serviceId="";

    this.serviceName="";

    this.qty=1;

    this.basicPrice=0;

    this.fees=0;

    this.total=0;

  }

}



class ServiceModel{

  constructor(){

    this.id="";

    this.name="";

    this.basic=0;

    this.fees=0;

    this.delivery=0;

    this.notes="";

    this.active=true;

  }

}
