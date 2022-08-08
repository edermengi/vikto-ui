AWS_REGION := eu-west-1
AWS_PROFILE := vikto
# S3_BUCKET  - specified as a parameter


npm-build:
	npm run build

upload:
	aws --profile "$(AWS_PROFILE)" --region "$(AWS_REGION)" \
		s3 rm --recursive s3://$(S3_BUCKET)

	cd build && \
	aws --profile "$(AWS_PROFILE)" --region "$(AWS_REGION)" \
		s3 cp --recursive . s3://$(S3_BUCKET)

deploy: npm-build upload