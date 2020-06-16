# 虚拟机安装
目前是在 Windows 10上安装VMware Workstation 15 Pro并安装CentOs 7 Minimal版。

*初期尝试用VirtualBox（主要考虑免费，且Docker for Desktop之类的实在VirtualBox上进行配置），不过最后还是切换成了VMware，主要原因是VirtualBox网络配置太坑，用户界面体验太差*

此配置包括如下内容：
- 安装 open vm tools
- 配置 静态IP
- 安装 ssh, git
- 安装 node 8, nrm, n, node 12.17.0
- 安装 jdk1.8

## VMware
### 安装配置
初始安装不作介绍。

### 网络配置
*安装完成后注意启用网络才可以连外网，启用网络方法：*

#### 初步配置CentOS网络 (可上网)
```
vi /etc/sysconfig/network-scripts/ifcfg-ens33
--- 设置
ONBOOT=yes
```

#### 安装Open Vmware Tools
```bash
yum -y install open-vm-tools
```

#### 安装VMware Tools
```bash
mount /dev/cdrom /media
cp /media/VMwareTools-9.9.2-2496486.tar.gz /tmp/

cd /tmp/
tar -zxf VMwareTools-9.9.2-2496486.tar.gz

# 安装前置库
yum -y install perl gcc gcc-c++ make cmake kernel kernel-headers kernel-devel net-tools

cd vmware-tools-distrib/
./vmware-install.pl

cd /
umount /media
```

#### 配置虚拟机静态IP
```
# 查看网关
netstat -rn

# 查看DNS
cat /etc/resolv.conf

# 关闭防火墙
systemctl stop firewalld # 临时关闭
systemctl disable firewalld # 然后reboot 永久关闭
systemctl status  firewalld # 查看防火墙状态。

# 配置网络为静态网络（方便xshell连接）
cd /etc/sysconfig/network-scripts
cp ifcfg-ens33 ifcfg-ens33.bak

vi /etc/sysconfig/network-scripts/ifcfg-ens33
--- 设置
ONBOOT=yes
BOOTPROTO=static
IPADDR=192.168.16.10
NETMASK=255.255.255.0
GATEWAY=192.168.16.2
DNS1=10.9.57.13
DNS2=10.9.57.14
DNS2=114.114.114.114

# 重启网络
systemctl restart network
```

#### 用户及权限配置
```
# 设置密钥访问
cd ~
ssh-keygen
chmod 700 ~/.ssh
cd ~/.ssh
touch authorized_keys && chmod 644 authorized_keys

# 添加访问机器公钥
vi authorized_keys


# 文件夹权限配置
chown -R admin /usr/local
chown admin /opt
```

*解决sudo报错，sudo：/usr/bin/sudo 必须属于用户 ID 0(的用户)并且设置 setuid 位*
```
chown root:root /usr/bin/sudo
chmod 4755 /usr/bin/sudo
```

#### 配置自定义NAT网络(VirtualBox)
新建自定义NAT网络：
- 管理 -> 全局设定 -> 网络
- 添加新NAT网络：
```
网络名称: MyNatNetwork
网络CIDR: 192.168.16.0/24
```

选择虚拟机网络
- 设置 -> 网络
- 网卡1
```
连接方式：NAT网络
界面名称：MyNatNetwork
```

#### 工具配置
```bash
# 安装screen防止安装更新过程中断
yum install -y screen
yum -S ops
yum -y update

# 安装git
yum install -y git

# 安装node 8
curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
yum install -y nodejs

su admin
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

vi ~/.bash_profile
# 行尾增加：export PATH=~/.npm-global/bin:$PATH

source ~/.bash_profile

npm install nrm -g
nrm use taobao

npm install -g n

# 切换版本
su root
n ls-remote
n 12.17.0

# 安装jdk8
rpm -qa | grep java # 检查是否自带java,如果则卸载之
yum search jdk # 查看有效java插件
yum -y list java* # 同上

yum install -y java-1.8.0-openjdk.x86_64
java -version

# 安装nginx
yum install -y nginx
chkconfig nginx on
service nginx start
```

## 配置Java开发环境
此环境主要目的在于构建Java分布式开发环境，此开发环境基于VM-CentOS7-Minimal - Base，配置包含：
- ZooKeeper
- Dubbo测试环境

## Zookeeper运维

### 安装部署
```bash
# 配置java环境
vim /etc/profile
# set java environment
JAVA_HOME=/usr/lib/jvm/jre-1.8.0-openjdk
PATH=$PATH:$JAVA_HOME/bin
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JAVA_HOME CLASSPATH PATH

cd /opt/pkgs
wget https://www.apache.org/dyn/closer.lua/zookeeper/zookeeper-3.6.1/apache-zookeeper-3.6.1-bin.tar.gz

mkdir -p /opt/ops

tar -zxvf apache-zookeeper-3.6.1-bin.tar.gz -C /opt/ops

cd /opt/ops
mv apache-zookeeper-3.6.1-bin zk

vi ~/.bash_profile

-----> 配置开始
# zookeeper env export
ZOOKEEPER_HOME=/opt/ops/zk
export PATH=$ZOOKEEPER_HOME/bin:HOME:$PATH
-----< 配置结束

```

### 配置
```bash
cd /opt/ops/zk
mkdir data logs

# 创建服务器id
echo 1 >> data/myid

cd conf
cp zoo_sample.cfg zoo.cfg

vi zoo.cfg
```
zoo.cfg配置
```
...
12 dataDir=/opt/ops/zk/data
13 dataLogDir=/opt/ops/zk/data/logs
...
19 server.1=192.168.16.10:2888:3888
...

```

#### 测试
```bash
# 关闭防火墙
systemctl stop firewalld
systemctl disable firewalld
systemctl status firewalld

# 启动
zkServer.sh start

# 如果出现错误，使用此命令启动以查看错误
zkServer.sh start-foreground

# 查看状态
zkServer.sh status
```

#### 设置开机启动
```bash
zkServer.sh stop

cd /etc/rc.d/init.d
touch zookeeper
chmod +x zookeeper

vi zookeeper

-----> 配置开始
#!/bin/bash
#chkconfig:2345 20 90    
#description:zookeeper    
#processname:zookeeper
export JAVA_HOME=/usr/lib/jvm/jre-1.8.0-openjdk
export PATH=$JAVA_HOME/bin:$PATH
case $1 in
        start) su root /opt/ops/zk/bin/zkServer.sh start;;
        stop) su root /opt/ops/zk/bin/zkServer.sh stop;;
        status) su root /opt/ops/zk/bin/zkServer.sh status;;
        restart) su root /opt/ops/zk/bin/zkServer.sh restart;;
        *) echo "require start|stop|status|restart" ;;
esac
-----< 配置结束

service zookeeper start/stop
chkconfig zookeeper on
chkconfig --add zookeeper
```

## 参考：
- [Centos系列之三：Centos7安装open-vm-tools和设置共享文件夹](https://notes.itxds.com/2018/centos-series-three-open-vm-tools/)
- [CentOS 安装VMware Tools](https://blog.csdn.net/programmer_sir/article/details/46626409)