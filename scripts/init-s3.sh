#!/bin/bash
echo "Criando bucket S3 local..."
awslocal s3 mb s3://meu-bucket-portfolio
echo "Bucket criado com sucesso!"