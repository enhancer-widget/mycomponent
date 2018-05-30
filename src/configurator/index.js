/**
 * Widget Configurator Sample
 * The input and output of the configurator is the profile of its corressponding 
 * widget.
 * @author 
 * @created
 */

require('./index.less');

var dependency = require('../lib/third-party-dependency');
var locale = require('./i18n');
var template = require('./index.html');

var configurator = {
  construct: function() {
    var self = this;
    var tplHTML = template({
      locale: locale(),
    });
    $('body').html(tplHTML);


    this.dataSourceConfig = Enhancer.DatasourceManager.createConfigurator('dataSourceDom', {
      supportedTypes: ['static'], //
      dataSpecification: `{
        rows: [{
          text: 'xx', // 展示文本
          value: 'xx' // 对应的值
        }]
      }`,
      onSave: function(source) {
        self.prof.dataSourceId = source.id;
      }
    });
  },

  /**
   * @setProfile {Function} [required] Will be called when user decides to  
   * config the widget on workbench.
   * @param profile {Object} The profile of corresponding widget.
   */
  setProfile: function(profile) {
    var self = this;
    this.prof = profile;

    if (profile.fontSize) {
      $('.font-size').val(profile.fontSize);
    }

    if (profile.dataSourceId) {
      Enhancer.DatasourceManager.getDatasource(profile.dataSourceId, (source) => {
        self.dataSourceConfig.setConfig(source);
      });
    }
  },
  /**
   * @getProfile {Function} [required] Will be called when user click the save
   * button which is on the bottom of the configurator dialog. Note that if the
   * profile is invalid which is configurated by user, you should gave tips to
   * user and return false to prevent this save operation.
   * @return {Object} profile
   */
  getProfile: function() {
    var fontSize = $('.font-size').val();
    this.prof.fontSize = fontSize; 

    return this.prof;
  },
  /**
   * @getSupportedEventList {Function} [optional] This method will be called if
   * implemented when the user click the save button to gather the events which
   * will be triggered in runtime by the widget instance. Note that the supported 
   * events would be different with the different profiles configurated by user in
   * the same type widget. 
   * @param profile {Object} The profile returned by getProfile() method which will be
   *   called before this method calling.
   * @return {Array<Object>} EventList
   */
  getSupportedEventList: function(profile) {
    return [{
      id: "onRowClick",
      name: "On Row Click",
      des: "Triggered when user click a list row"
    }];
  },
  /**
   * @getSupportedVariableList {Function} [optional] This method will be called if
   * implemented when the user click the save button, to gather the variables owned
   * by the widget instance. Note that the supported variables would be different with 
   * the different profiles configurated by user in the same type widget.
   * @param profile {Object} The profile returned by getProfile() method which will be
   *   called before this method calling.
   * @return VariableList {Array<Object>} 
   **/
  getSupportedVariableList: function(profile) {
    return [{
      name: 'currentClickRowData',
      type: 'object',
      des: 'current clicking row data'
    }, {
      name: 'lastClickRowData',
      type: 'object',
      des: 'last clicked row data'
    }];
  },
  /**
   * @getDependentVariableList {Function} [optional] This method is repsonsible
   * for gathering the dependent variables of the widget from context.
   * @param profile {Object} The profile returned by getProfile() method which will be
   *   called before this method calling.
   * @return {Array<String>}
   */
  getDependentVariableList: function(profile) {
    // Variable List example
    return [];
  }
};

// register configurator
Enhancer.registerWidgetConfigurator(configurator);