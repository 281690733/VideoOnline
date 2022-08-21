import type { AppContext } from "@netless/window-manager";
import React, { useState } from 'react';
import { Form, message, Modal, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { SERVICE_URL } from "../../utils";


export interface AppProps {
    context: AppContext;
}


const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
function UploadImg({ context }: AppProps) {
    const [fileList, setFileList] = useState<UploadFile[]>();
    const [loading, setLoading] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        setFileList(fileList);
        const uploadFiles = [] as Array<UploadFile>
        fileList?.forEach((file) => {
            if (file.status === 'done') {
                const response = file.response;
                if (response.success) {
                    file.url = response.data
                    uploadFiles.push(file)
                }
            }
        })
        setFileList(fileList);
    };


    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            const response = file.response;
            if (response.msg == "上传成功") {
                await window.fastboard.insertImage(response.data);
            }
            return
        }
        

        setPreviewImage(file.url || (file.preview as string));
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
        const response = file.response;
        if (response.msg == "上传成功") {
            await window.fastboard.insertImage(response.data);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <div>
            <Form className='OpenVideo-form' layout='inline'>
                <Upload
                    action={`${SERVICE_URL}/file/uploadOneFile`}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    name="file"
                >
                    {fileList ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Form>
        </div>
    );
}
export default UploadImg;