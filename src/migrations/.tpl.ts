export default {
  /**
   * @param {obejct} sqldb 包含常用公用方法, 和 queryInterface 原始查询
   * @param {obejct} DataTypes 数据类型
   *
   * @return {promise} 返回 promise
   */
  async up(sqldb, DataTypes) {
    // 转换为新状态的逻辑
  },

  /**
   * @param {obejct} sqldb 包含常用公用方法, 和 queryInterface 原始查询
   * @param {obejct} DataTypes 数据类型
   *
   * @return {promise} 返回 promise
   */
  async down(sqldb, DataTypes) {
    // 恢复修改的逻辑
  },
};
