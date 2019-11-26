import requestInterface from '@/utils/requestInterface'

export function getList() {
  return requestInterface({
    url: 'http://localhost:8081/system',
    method: 'get'
  })
}

export function getbriefinfo(id) {
  return requestInterface({
    url: 'http://localhost:8081/system/' + id,
    method: 'get'
  })
}

export function getbriefinfo2(id) {
  return requestInterface({
    url: 'http://localhost:8081/interfaces/' + id,
    method: 'get'
  })
}

export function getitemcontain(id) {
  return requestInterface({
    url: 'http://localhost:8081/interfaceByNo/' + id,
    method: 'get'
  })
}

export function getitemconfigjkpzxx(id, currentPage, pageSize) {
  return requestInterface({
    url: 'http://localhost:8081/interface_impl_page/' + id + '&' + currentPage + '&' + pageSize,
    method: 'get'
  })
}

export function getItemConfigjkpzxxTotal(id) {
  return requestInterface({
    url: 'http://localhost:8081/interface_impl_count/' + id,
    method: 'get'
  })
}

export function updateItemConfigjkpzxx(data) {
  return requestInterface({
    url: 'http://localhost:8081/interface_impl',
    method: 'put',
    data: data
  })
}

export function addItemConfigjkpzxx(data) {
  return requestInterface({
    url: 'http://localhost:8081/interface_impl',
    method: 'post',
    data: data
  })
}

export function deleteItemConfigjkpzxx(id) {
  return requestInterface({
    url: 'http://localhost:8081/interface_impl/' + id,
    method: 'delete'
  })
}

export function getitemconfigjkxyxx(id, currentPage, pageSize) {
  return requestInterface({
    url: 'http://localhost:8081/interface_protocol_page/' + id + '&' + currentPage + '&' + pageSize,
    method: 'get'
  })
}

export function getItemConfigjkxyxxTotal(id) {
  return requestInterface({
    url: 'http://localhost:8081/interface_protocol_count/' + id,
    method: 'get'
  })
}

export function downLoadItemConfigjkxyxx(id) {
  window.location.href = 'http://localhost:8081/download/' + id
}

export function deleteItemConfigjkxyxx(id) {
  return requestInterface({
    url: 'http://localhost:8081/interface_protocol/' + id,
    method: 'delete'
  })
}

export const itemConfigjkxyxxUpLoadFilePath = 'http://localhost:8081/interface_protocol'

export function updateDepartment(data) {
  return requestInterface({
    url: 'http://localhost:8081/system',
    method: 'put',
    data: data
  })
}

export function deleteInterfaceById(id) {
  return requestInterface({
    url: 'http://localhost:8081/interface/' + id,
    method: 'delete'
  })
}

export function updateInterfaceInfo(data) {
  return requestInterface({
    url: 'http://localhost:8081/interface',
    method: 'put',
    data: data
  })
}

export function insertInterfaceInfo(data) {
  return requestInterface({
    url: 'http://localhost:8081/interface',
    method: 'post',
    data: data
  })
}

export function getAllData() {
  return requestInterface({
    url: 'http://localhost:8081/systemAndInterfaces',
    method: 'get'
  })
}

export function insertDepartment(data) {
  return requestInterface({
    url: 'http://localhost:8081/system',
    method: 'post',
    data: data
  })
}

export function deleteSystem(id) {
  return requestInterface({
    url: 'http://localhost:8081/system/' + id,
    method: 'delete'
  })
}

export function deleteInterface(id) {
  return requestInterface({
    url: 'http://localhost:8081/interface/' + id,
    method: 'delete'
  })
}
