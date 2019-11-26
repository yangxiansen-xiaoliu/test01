<template>
  <div style="padding-top: 10px;padding-left: 20px;margin-left: 20px;margin-top: 100px;">
      <h4 style="height: 10px;text-align: left">选择上传接口协议</h4>
      <h5 style="height: 10px;text-align: left;color: red">提示:单个文件最大上传为50MB(文件名不能包含"+")</h5>
      <div align="left">
        <el-upload
          class="upload-demo"
          ref="upload"
          name="fileList"
          :data="extraData"
          :action="upLoadFilePath"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="onChange"
          :on-success="uploadSuccess"
          :show-file-list="false"
          :auto-upload="false"
          :file-list="fileList"
          >
          <el-button slot="trigger" size="big" type="primary">选取文件</el-button>
          <span v-if="fileName == ''">未选择任何文件</span>
          <span v-else style="color: deepskyblue">{{fileName}}</span>
          请选择协议类型:
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" @click="submitUpload">上传</el-button>&nbsp;&nbsp;
          <el-button type="primary" @click="closeUpload">取消</el-button>
          <span>{{ value }}</span>&nbsp;&nbsp;
        </el-upload>
      </div>
  </div>
</template>

<script>
  import { getitemcontain, itemConfigjkxyxxUpLoadFilePath } from '@/api/interfaceinfo'
  export default {
    data() {
      return {
        options: [
          { value: '协议规约', label: '协议规约' },
          { value: '系统配置', label: '系统配置' },
          { value: '开通申请', label: '开通申请' },
          { value: '其他资料', label: '其他资料' }
        ],
        value: '',
        fileName: '',
        extraData: {
          protocol : ''
        },
        upLoadFilePath: '',
        fileList: []
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      onChange(file, fileList){
        if(file.status == 'ready') {
          this.fileName = file.name
          this.fileList = fileList.slice(-1)
        }else {
          this.value = ''
          this.fileName = ''
        }
      },
      submitUpload(){
        if(typeof this.extraData.protocol == 'string') {
          this.extraData.protocol = JSON.parse(this.extraData.protocol)
        }
        this.extraData.protocol.prot_type = this.value
        this.extraData.protocol = JSON.stringify(this.extraData.protocol)
        this.$refs.upload.submit();
      },
      uploadSuccess(response, file, fileList){
        this.$emit('triggerFooterMethod', true)
        this.$message({ message: file.name + '上传成功！！！', type: 'success' })
      },
      closeUpload(){
        this.value = ''
        this.fileName = ''
      }
    },
    created() {
      getitemcontain(this.id).then(response=> {
        let interfaceNo = response.data.interface_no
        let protocolData = {interface_no: interfaceNo, upload_user: 'yang', prot_type: '请选择'}
        this.extraData.protocol = protocolData
      })
      this.upLoadFilePath = itemConfigjkxyxxUpLoadFilePath
    },
    props: ['id']
  }
</script>

<style>

</style>
