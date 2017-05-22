# GTA: Network Master Server

This is just in case we lose the original or you feel like running your own little network.

## Setting up servers & clients

On the server and client, find `settings.xml`, and change the following line 

    <masterserver>http://master.gtanet.work/</masterserver>

to the URL of your master server. It *does* support https, however there might be a reason to not use it on the server. I do not know this reason.

## Quick Deploy Guide

to be written

## Developing

I use `docker-compose` for simple dev server setup. Just run

    docker-compose up -d

and you're good!

You might want Fiddler, Wireshark, mitmproxy, or some other tool to intercept the real masterserver's traffic.

There is an mitmproxy dump in `etc/mitmproxy-flow.txt`
