<@markup id="css" >
    <#-- CSS Dependencies -->
   <@link rel="stylesheet" type="text/css" href="${page.url.context}/res/extras/components/dashlets/audit-application.css" group="dashlets"/>   
</@>

<@markup id="js">
    <#-- JavaScript Dependencies -->    
    <@script type="text/javascript" src="${url.context}/res/modules/simple-dialog.js" group="dashlets"/>
    <#-- Audit application dashlet -->
    <@script type="text/javascript" src="${page.url.context}/res/extras/components/dashlets/audit-application.js" group="dashlets"/>  
</@>

<@markup id="widgets">    
   <@createWidgets group="dashlets"/>   
</@>

<#assign el=args.htmlid?js_string>

<@markup id="html">
   <@uniqueIdDiv>
        <div class="dashlet audit-application-dashlet" id="${el}-dashlet">
           <div class="title" id="${el}-title">${msg("audit.dashlet.header.default")}</div>
           <div class="refresh"><a id="${el}-refresh" href="#">&nbsp;</a></div>


           <div class="toolbar yui-toolbar" id="${el}-toolbar">
              <div class="links audit-application-dashlet-spaced-height" id="${el}-links">
                 <#-- ie7 float bug : the align-right floated element must be declared before the non-floated (left) one... -->
                 <span class="audit-application-dashlet-custom-align-right">
                    <a class="theme-color-1" href="${msg("audit.dashlet.link.help.url")}" id="${el}-help-link" target="_blank">${msg("audit.dashlet.link.help")}</a>
                 </span>

                 <#if userHasConfigPermission && userIsAdmin>
                 <#-- for some reason, ie6 ignores the inherited left padding of the link -- wrap in a specific span if on ie6 -->
                 <!--[if IE 6]>   <span class="audit-application-dashlet-spaced-left"> <![endif]-->
                 <span>
                    <a class="theme-color-1" href="#" id="${el}-configure-link">${msg("audit.dashlet.link.configure")}</a>
                 </span>
                 <!--[if IE 6]>   </span> <![endif]-->
                 </#if>
              </div>
           </div>

           <#-- audit only allows admin to query audit entries. Therefore the dashlet is only usable by admin users. -->
           <#if userIsAdmin>
              <#assign currentHeight=default_height>
              <#if args.height??><#assign currentHeight=args.height></#if>
                 <div class="body" style="height: ${currentHeight}px;" id="${el}-body">
                    <div class="message audit-application-dashlet-spaced-left" id="${el}-message"></div>

                    <div class="audit-application-dashlet-spaced-left top-padded" id="${el}-searchbox">
                       <#-- search box to filter audit values from YUI -->
                       <label id="${el}-searchWithinResultsFilterLabel" for="${el}-searchWithinResultsFilter">${msg("audit.dashlet.searchWithinResults",0)} :</label>
                       <input type="text" id="${el}-searchWithinResultsFilter">
                    </div>

                    <div class="entries custom-scrollable-list" id="${el}-entries"></div>
                 </div>
           <#else>
              <div class="body audit-application-dashlet-spaced-left" id="${el}-body">
                 ${msg("audit.dashlet.adminPrivilegesRequired")}
              </div>
           </#if>
        </div>        
   </@>  
</@>

