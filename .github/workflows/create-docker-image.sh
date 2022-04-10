name: Build and Publish Docker image

on:
  # run it on push to the default repository branch
  # push:
  #   branches: [main]
  # run it during pull request
  # pull_request:
  workflow_dispatch:
  workflow_call:

defaults:
  # define job to build and publish docker image
  build-and-push-docker-image:
    name: Build Docker image and push to repositories
    # run only when code is compiling and tests are passing
    runs-on: ubuntu-latest

    # steps to perform in job
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      # setup Docker buld action
      - name: Set up Docker Buildx
        id: buildx
        uses: docker/setup-buildx-action@v1

      - name: Login to DockerHub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      # - name: Login to Github Packages
      #   uses: docker/login-action@v1
      #   with:
      #     registry: ghcr.io
      #     username: ${{ github.actor }}
      #     password: ${{ secrets.GHCR_PAT }}
      
      - name: Build image and push to Docker Hub and GitHub Container Registry
        uses: docker/build-push-action@v2
        with:
          # relative path to the place where source code with Dockerfile is located
          context: .
          # Note: tags has to be all lower-case
          tags: |
            utkusarioglu/web:latest-dev
            # ghcr.io/oskardudycz/eventsourcing.nodejs/simple:latest
          # build on feature branches, push only on main branch
          file: Dockerfile.dev
          push: ${{ github.ref == 'refs/heads/main' }}

      - name: Image digest
        run: echo ${{ steps.docker_build.outputs.digest }}
