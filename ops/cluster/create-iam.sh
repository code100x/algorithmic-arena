

export cluster_name=prod
export role_name=AmazonEKS_EFS_CSI_DriverRole

eksctl utils associate-iam-oidc-provider  --region ap-south-1  --cluster $cluster_name --approve

eksctl create iamserviceaccount \    --name efs-csi-controller-sa \                         
    --namespace kube-system \
    --cluster $cluster_name \
    --region ap-south-1  --role-name $role_name \
    --role-only \
    --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEFSCSIDriverPolicy \
    --approve

TRUST_POLICY=$(aws iam get-role --role-name $role_name --query 'Role.AssumeRolePolicyDocument' | \
    sed -e 's/efs-csi-controller-sa/efs-csi-*/' -e 's/StringEquals/StringLike/')
aws iam update-assume-role-policy --role-name $role_name --policy-document "$TRUST_POLICY"