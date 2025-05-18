FROM debian:trixie-slim

RUN apt update && apt upgrade -y

RUN apt install -y curl jq groff unzip wget nginx

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
