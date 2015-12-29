
module.exports = {

  /**
   *
   * @param res
   * @param err
   * @param resposeObj
   * @param errorMsg
   * @returns {*}
   */
  checkResponseForData: function (res, err, resposeObj, errorMsg) {
    if (err) return res.json(400, err);
    if (!resposeObj) return res.json(401, errorMsg);
    return undefined;
  }

}
