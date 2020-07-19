<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch({ type: "getIp" });

    // var ip = this.myIP()
    // console.log(ip);
    // this.$store.dispatch({ type: "loadClientAuth2" });
  },
  methods: {
    myIP() {
      var xmlhttp, ipAddress;
      if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
      else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

      xmlhttp.open("GET", "https://ipapi.co/json/", false);
      xmlhttp.send();
      return JSON.parse(xmlhttp.responseText);
      // return xmlhttp.responseText['ip']
      //  const hostipInfo = xmlhttp.responseText.split("\n");
      // console.log(hostipInfo, 'hostipInfo');
      // console.log(xmlhttp, 'xmlhttp');
      // console.log(xmlhttp.responseText.ip, 'xmlhttp.responseText');
      // for (var i=0; hostipInfo.length >= i; i++) {
      //     ipAddress = hostipInfo[i].split(":");
      //     if ( ipAddress[0] == "IP" ) return ipAddress[1];
      // }

      // return false;
    }
  }
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
