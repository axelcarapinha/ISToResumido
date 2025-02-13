sudo docker rmi --force $(sudo docker images -q) #TODO confirma
sudo docker rm --force $(sudo docker ps -a -q)

cd backend/
sudo docker build -f Dockerfile.backend -t backend_img .

cd ..

cd frontend/
sudo docker build -f Dockerfile.frontend -t frontend_img .

sudo docker run --network host --name backend backend_img