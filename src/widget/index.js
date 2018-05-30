// Class, jQuery, Enhancer are global objects that you can use them anywhere
// referer to #doc...

require('./index.less');
var locale = require('./i18n');
var tpl = require('./index.html');

Enhancer.registerWidget({
  /**
   * Widget Constructing Function
   * @param profile {Object} The widget profile which is configurated by 
   *   widget configurator.
   * @param zContext {Object} Current context which contains the dependent
   *    variable values of this widget.
   */
  construct: function(profile, zContext) {
    var self = this;
    this.prof = profile;

    var $container = self.getContainer();


    $container.html(tpl({
      locale: locale()
    }));

    this.getSourceData(this.prof.dataSourceId, {}, function (data) {
      if (data.rows) {
        data = data.rows;
      }
      self.data = data;
      var html = '';
      data.forEach(function (item) {
        html += '<li data-value="' + item.value + '">' + item.text + '</li>';
      });

      $container.find('.fruit-list').html(html);

      if (profile.fontSize) {
        $container.find('.fruit-list').css('font-size', parseInt(profile.fontSize));
      }

      self.bindEvent();

      self.trig('complete');
    });

    
    
    return $container;
  },

  bindEvent() {
    var self = this;
    var $container = self.getContainer();

    $container.find('.fruit-list').on('click', 'li', function (e) {
      var $li = $(e.target).closest('li');
      var val = $li.data('value');
      self.lastClickRowData = self.currentClickRowData;
      self.data.some(function(item) {
        if (item.value === val) {
          self.currentClickRowData = item;
          return true;
        }
      });

      console.log(self.lastClickRowData, self.currentClickRowData);
      self.trig('onRowClick');
    });
  },

  /**
   * onFrameReady {Function} [Optional] This function will be called after all widget complete events
   *   are triggered first time in this frame, which means the frame to where this widget is belong
   *   is ready. If necessary, handle sth in this function to make sure the code will be executed as
   *   you expected.
   * @param zContext {Object} Current context which contains the dependent
   *    variable values of this widget.
   */
  onFrameReady: function(zContext) {

  },

  /**
   * getData {Function} Each widget instance should contain the data of variables
   *   which are declared by widget-configurator when the widget is bound in this 
   *   window and the `getSupportedVariables` method of widget-configurator is 
   *   called. It is recommend to return default data which are specified by app
   *   developer in widget-configurator maybe so that there are available data 
   *   used by other depended window when this widget is initilized as primary.
   * @return {Object} The data of variables.
   */
  getData: function() {
    return {
      "lastClickRowData": this.lastClickRowData,
      "currentClickRowData": this.currentClickRowData
    };
  },
  /**
   * isValid {Function} The Enhancer will call this method to check if the data of
   *   this widget is available so that to controll next action to response the event.
   * @return {Boolean/Promise} whether the data is valid or available. if a Promise object
   * is returned, the parameter of callback of promise.then method must be a boolean.
   */
  isValid: function() {
    var isValid = true;
    if (!isValid) {
      // Do sth to show user this widget is invalid.
    }
    return isValid;
  },
  /**
   * affected {Function} This method will be called when some event is triggered
   *   and this widget should be affected following the operating flow diagram.  
   * @param zContext {Object} Current context which contains the dependent
   *    variable values of this widget.
   */
  affected: function(zContext) {}
});