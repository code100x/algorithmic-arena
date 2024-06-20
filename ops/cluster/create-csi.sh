eksctl create addon --cluster prod  --region ap-south-1  --name aws-efs-csi-driver --version latest \
    --service-account-role-arn arn:aws:iam::100749360009:role/AmazonEKS_EFS_CSI_DriverRole --force
