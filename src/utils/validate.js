/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  //去后台查询用户是否存在，如果用户名密码都没问题，返回true，否则返回false
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
