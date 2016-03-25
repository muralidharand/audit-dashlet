function getUserIsSiteManager(username)
{
   // Call the repository to see if the user is a site manager or not
   var userIsSiteManager = false;
   var membership = context.properties["memberships"];
   if (!membership)
   {
      var json = remote.call("/api/sites/" + page.url.templateArgs.site + "/memberships/" + stringUtils.urlEncode(username));
      if (json.status == 200)
      {
         membership = jsonUtils.toObject(json);
      }
   }
   if (membership)
   {
      userIsSiteManager = (membership.role == "SiteManager");
   }
   return userIsSiteManager;
}
function getUserHasConfigPermission(username)
{
   if (page.url.templateArgs.site != null) // Site or user dashboard?
   {
      return getUserIsSiteManager(username);
   }
   else // user dashboard
   {
      return true;
   }
}
function main()
{
   model.userHasConfigPermission = getUserHasConfigPermission(user.name);
   model.userIsAdmin = user.isAdmin;
   
      /* For Alfresco 5.0 version fix */
    var auditApplicationDashlet = {
      id : "auditApplicationDashlet", 
      name : "Extras.dashlet.AuditApplication",
      assignTo : "auditApplicationDashlet",
      options : {        
        componentId: "${instance.object.id}",        
        // escape quotes in user-entered parameters, just in case
        application: (args.application != null) ? escape_quotes(args.application) : "",
        valueFilter: (args.valueFilter != null) ? escape_quotes(args.valueFilter) : "",
        limit: (args.limit != null) ? escape_quotes(args.limit) : "",
        rowsPerPage: (args.rowsPerPage != null) ? escape_quotes(args.rowsPerPage) : "10",
        additionalQueryParams: (args.additionalQueryParams != null) ? escape_quotes(args.additionalQueryParams) : "",
        
        //these values are managed by the dashlet, but escape them anyways, just in case...
        show_id_column: (args.show_id_column != null) ? escape_quotes(args.show_id_column) : "show",
        show_user_column: (args.show_user_column != null) ? escape_quotes(args.show_user_column) : "show",
        show_time_column: (args.show_time_column != null) ? escape_quotes(args.show_time_column) : "show",
        show_values_column: (args.show_values_column != null) ? escape_quotes(args.show_values_column) : "show",
        trim_audit_paths: (args.trim_audit_paths != null) ? escape_quotes(args.trim_audit_paths) : "true"
      }
   };

   // IE (as usual) needs apparently a default height, otherwise resizing may not work in some situations
    model.default_height = 320;
    /* 
       dashlet resizer does not dynamically adjust the number of rows displayed on the page re: pagination.
       The number of rows can be configured in the dialog though, sufficient for now.
       future research : subscribe to rowsPerPageChange, "" etc...  
     */
   
    var dashletResizer = {
      id : "DashletResizer", 
      name : "Alfresco.widget.DashletResizer",
      initArgs : ["\"" + args.htmlid + "\"","\"" + instance.object.id + "\""],
      useMessages: false,
      options:{
          minDashletHeight: model.default_height
      }     
    };
    
    model.widgets = [auditApplicationDashlet,dashletResizer];
}
//for safety, escape double quotes in the arguments that will be passed to the instanciated dashlet component options, otherwise the json feed will be invalid. 
//Takes a string as parameter (cannot be null), and returns the string with double quotes escaped. If the parameter is the empty string, it will be returned as is. 
function escape_quotes(paramString){
    if (paramString != undefined && paramString.length > 0){
        //note that the various backslashes are required to pass through the evaluation chain
        //return paramString.replace('"',"\\\\\\\"",'r');
        return paramString.replace(/"/g, "\\\\\\\"");
    }
    else
        return paramString;
}
main();