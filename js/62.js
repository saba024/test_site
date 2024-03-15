"use strict";(self.webpackChunkmp_webgl=self.webpackChunkmp_webgl||[]).push([[62],{62576:(i,n,t)=>{t.d(n,{Bl:()=>r,Lm:()=>d,Pi:()=>o,RV:()=>a,e_:()=>l,v6:()=>s});var e=t(19663);class s extends e.m{constructor(){super(),this.id="PLUGIN_RESET_ALL",this.payload={}}}class a extends e.m{constructor(i,n,t,e){super(),this.id="PLUGIN_RELOAD",this.payload={name:i,config:n,configMeta:t,permissions:e||{}}}}class o extends e.m{constructor(i,n,t,e){super(),this.id="PLUGIN_LOAD",this.payload={name:i,config:n,configMeta:t,permissions:e||{}}}}class l extends e.m{constructor(i){super(),this.id="PLUGIN_UNLOAD",this.payload={name:i}}}class d extends e.m{constructor(i,n){super(),this.id="PLUGIN_CONFIG_FETCH_DATA",this.payload={operation:i,callback:n}}}class r extends e.m{constructor(i,n){super(),this.id="ATTACHMENT_ASSOCIATE_WITH_PLUGIN",this.payload={attachmentId:i,pluginId:n}}}},98062:(i,n,t)=>{t.r(n),t.d(n,{default:()=>w});var e=t(61864),s=t(92810),a=t(48913),o=t(97542),l=t(73339),d=t(23748),r=t(54244),c=t(10374),u=t(62576),g=t(80361),h=t(1581),p=t.n(h),f=t(5477),m=t.n(f),y=t(2957),P=t(32886);class v{getFactory(i){return i.messengerFactory}}class w extends o.Y{constructor(){super(...arguments),this.name="plugin",this.data=new l.e,this.allowLoad=!1,this.allowLiveReload=!0,this.ajv=new(p())({strict:!1}),this.pluginOverlayElements=new Map,this.onResetPlugins=async()=>{await this.unloadPlugins(),await this.loadConfigured()},this.onLoadPlugin=async({config:i,configMeta:n,permissions:t},e)=>{var s;if(this.allowLiveReload&&e){const a={properties:n,required:[]};for(const i of Object.keys(a.properties)){(null===(s=a.properties[i].required)||void 0===s?void 0:s.includes(i))&&a.required.push(i)}if(!this.ajv.validate(a,i))return;await this.load(Object.assign(Object.assign(Object.assign({},e),{config:i}),t))}},this.onUnloadPlugin=async i=>{if(this.allowLiveReload&&i){const n={applicationKey:i.applicationKey,id:i.id};await this.unload(n)}},this.onReloadPlugin=async({name:i,config:n,configMeta:t,permissions:e},s)=>{this.allowLiveReload&&(await this.onUnloadPlugin(s),this.debouncedOnLoadPlugin({name:i,config:n,configMeta:t,permissions:e},s))},this.debouncedOnReloadPlugin=(0,g.D)(this.onReloadPlugin,500),this.onReloadPluginCommand=async i=>{if(!this.allowLiveReload)return;let n=this.configuredPlugins.find((n=>n.id===i.name));n||(n=this.createLoadableConfig(i.name)),this.debouncedOnReloadPlugin(i,n)},this.debouncedOnLoadPlugin=(0,g.D)(this.onLoadPlugin,500),this.onLoadPluginCommand=async i=>{this.debouncedOnLoadPlugin(i,this.createLoadableConfig(i.name))},this.debouncedOnUnloadPlugin=(0,g.D)(this.onUnloadPlugin,500),this.onUnloadPluginCommand=async i=>{let n=this.configuredPlugins.find((n=>n.id===i.name));if(!n){const t=this.availablePlugins.get(i.name);t&&(n={applicationKey:t.applicationKey,id:t.name})}this.debouncedOnUnloadPlugin(n)},this.onFetchSdkDataCommand=async i=>{const n=this.pluginConfigDataModule.serviceSdkKey;class t{constructor(i){this.sdk=i}connect(){return this.sdk.connectPlugin(n,"PluginConfigRootConnection")}cancelConnecting(){}}this.serviceSdkConnection||(this.serviceSdkConnection=await a.tK.connect(new t(this.sdk),new v,window));const[e,s]=i.operation.split(".");let o;try{const i=this.serviceSdkConnection[e][s];o=i.subscribe?await new Promise(((n,t)=>{const e=i.subscribe((i=>{e.cancel(),n(i)}))})):await i()}catch(n){throw new Error("Failed to run command: "+i.operation)}i.callback(o)}}async init(i,n){if(m()(this.ajv),[this.ses,this.sdk,this.pluginConfigDataModule]=await Promise.all([n.getModuleBySymbol(s.lC),n.getModuleBySymbol(e.Mv),n.getModuleBySymbol(s.Yi)]),this.engine=n,this.allowLoad=i.pluginPolicies.enabled,this.allowLiveReload=this.allowLoad&&!this.pluginConfigDataModule.pluginConfigData.disabled&&!this.pluginConfigDataModule.pluginConfigData.preventLiveEdit,this.allowLoad){const i=n.subscribe(c.LZ,(async({phase:t,application:e})=>{t===r.nh.PLAYING&&(i.cancel(),this.allowLiveReload?await this.loadConfigured():(this.log.devInfo("Reached PLAYING stage, checking whether configured plugins need to load to start: ",e),e===r.Mx.SHOWCASE&&await this.loadConfigured(),this.bindings.push(n.subscribe(c.pB,(async i=>{if(this.log.devInfo("Switch in active application detected by plugin system: ",i.application),i.application===r.Mx.WORKSHOP)try{await this.disposeAll()}catch(i){this.log.debugWarn("Entering workshop, one or more plugins failed to dispose properly:",i)}else i.application===r.Mx.SHOWCASE&&await this.loadConfigured()})))))}))}this.bindings.push(n.commandBinder.addBinding(u.v6,this.onResetPlugins),n.commandBinder.addBinding(u.RV,this.onReloadPluginCommand),n.commandBinder.addBinding(u.Pi,this.onLoadPluginCommand),n.commandBinder.addBinding(u.e_,this.onUnloadPluginCommand),n.commandBinder.addBinding(u.Lm,this.onFetchSdkDataCommand),n.commandBinder.addBinding(P._,this.handlePluginVisibility.bind(this))),n.market.register(this,l.e,this.data)}async handlePluginVisibility(i){var n;for(const t of i.ids)this.data.visibilityData.set(t,i.value),null===(n=this.pluginOverlayElements.get(t))||void 0===n||n.classList.toggle("hidden",!i.value)}async loadConfigured(){if(this.pluginConfigDataModule.registryLoaded){if(this.pluginConfigDataModule.pluginConfigData.disabled)return void this.log.debug("Cannot load plugins! Disabled by URL parameter.");this.configuredPlugins=await this.pluginConfigDataModule.getConfiguredPlugins(),this.availablePlugins=this.pluginConfigDataModule.pluginConfigData.availablePlugins,this.data.visibilityData.replace(this.configuredPlugins.reduce(((i,n)=>{var t;return i[n.id]=null===(t=this.data.visibilityData.get(n.id))||void 0===t||t,i}),{})),this.log.debug("Combined configuration with registry data, loading plugins: "+JSON.stringify(this.configuredPlugins,void 0,2)),await this.waitForPluginLoad()}}async waitForPluginLoad(){var i;if(!this.configuredPlugins)return void this.log.error("Waiting for load before plugin records fetched.");const n=[];for(const i of this.configuredPlugins)n.push(this.load(i).then((()=>{this.engine.broadcast(new y.I(i.id,i.src,Date.now()-performance.timing.navigationStart))})));try{await Promise.all(n)}catch(i){this.log.warn("Issues were encountered loading configured plugins.")}for(const n of this.pluginOverlayElements.keys()){const t=this.data.visibilityData.get(n);null===(i=this.pluginOverlayElements.get(n))||void 0===i||i.classList.toggle("hidden",!t)}}async fetchPlugin(i,n,t,e){e.strict&&this.ses.freezeForStrict();const s=await this.ses.makeSecureEnvironment(i+""+(t?"-"+t:""),n,e,this.pluginConfigDataModule.pluginConfigData.eventTarget);if(s){return[s,s.compartment.globalThis.plugin]}return null}async unload(i){const n=i.id&&""!==i.id?i.id:"default",t={applicationKey:i.applicationKey,id:n},e=this.data.get(t);let s=null;if(e){try{s=e.dispose()}catch(i){this.log.warn("An error occurred when disposing a plugin, it may be in a partially disposed state",i)}this.data.delete(t)}return s||Promise.resolve()}async load(i){var n;const{applicationKey:t,src:e,id:s,strict:a,fetchLevel:o=d.u.None}=i;if(!this.allowLoad){const i=e.startsWith("http")?e:`${e.substring(0,16)}...`;return Promise.reject(`Load for plugin <${s}:${i}> requested, but plugin system is not available.`)}const l=void 0===a||a,r=s||"default",c={applicationKey:t,id:r};if(this.data.get(c))return Promise.reject(`Plugin for ${t}-${r} already loaded.`);const u={strict:l,canFetch:o>=d.u.AnonymousFetch,canFetchAsUser:o>=d.u.UserFetch},[g,h]=await this.fetchPlugin(t,e,r,u)||[];if(g&&h){const e=null===(n=g.overlayElement)||void 0===n?void 0:n.querySelector(`.${t}-${s}`);e&&(this.pluginOverlayElements.set(r,e),this.data.visibilityData.set(r,!0)),await this.initPlugin(g,h.factory,i,r)}}async initPlugin(i,n,t,e){const s=n(),{applicationKey:o,id:l,config:d}=t;let r=()=>{};const c=s.onInit||s.init;let u=Promise.resolve();if(c){class i{constructor(i){this.sdk=i}connect(){return this.sdk.connectPlugin(o,l)}cancelConnecting(){}}const n=await a.tK.connect(new i(this.sdk),new v,window);u=c.call(s,n,d),r=()=>n.disconnect()}const g=this.pluginConfigDataModule.pluginConfigData.eventTarget,h=this.setupVisibilityEvents(g);async function p(){const n=s.onDestroy||s.dispose;return((null==n?void 0:n.call(s))||Promise.resolve()).finally((()=>{r(),h.cancel(),g.delete(e),i.dispose()}))}const f={applicationKey:o,id:l};try{return await u,this.data.set(f,s,p),Promise.resolve()}catch(i){this.log.warn("Plugin initialization failed: ",i),this.log.debugWarn("Attemptying dispose for clean up...");try{await p()}catch(i){this.log.warn("Auto-cleanup of plugin had errors: ",i)}return Promise.reject(i)}}setupVisibilityEvents(i){const n=async(i,n)=>{"_CLOSE_"===i.name&&await this.engine.commandBinder.issueCommand(new P._([n],!1))};return i.onElementChanged({onAdded:n,onUpdated:n})}dispose(i){super.dispose(i),this.disposeAll().catch((i=>{this.log.warn("One or more plugins failed to dispose properly.",i)}))}disposeAll(){return this.configuredPlugins=[],this.unloadPlugins()}unloadPlugins(){const i=[];for(const[n,t]of this.data.plugins.entries())i.push(t.dispose());return this.data.plugins.clear(),Promise.all(i)}createLoadableConfig(i){const n=this.availablePlugins.get(i),{src:t,config:e,applicationKey:s,strict:a,outputs:o}=n;return{id:i,src:t,config:e,outputs:o,applicationKey:s,strict:a}}}}}]);