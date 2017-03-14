```
PROXIED_SERVER=http://pacsemulator.cloudapp.net:8042/dicom-web/studies meteor --port 4444
```

Additional options set via environment variables:

```
PROXY_PORT=####                             Port number to listen on for proxy requests. Defaults to
                                            9042

ETH_ACCOUNTS=hex-string-0,hex-string-1      One or more account IDs separated by commas. Defaults to
                                            Ethereum instance provider's account.

ETH_INSTANCE_URL=url                        The Ethereum instance URL. Defaults to
                                            http://localhost:8545

```
