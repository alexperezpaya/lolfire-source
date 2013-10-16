// Generated by CoffeeScript 1.6.3
(function() {
  var ASObject, AggregatedStatsPacket, AuthPacket, ConnectPacket, Decoder, Encoder, SummonerNamesPacket, GetSummonerDataPacket, GetTeamById, GetTeamForSummoner, HeartbeatPacket, LoginPacket, LookupPacket, Packet, PlayerStatsPacket, RecentGames, uuid, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  uuid = require('node-uuid');

  Encoder = require('namf/amf0').Encoder;

  Decoder = require('namf/amf0').Decoder;

  ASObject = require('namf/messaging').ASObject;

  Packet = (function() {
    function Packet(options) {
      this.options = options;
    }

    return Packet;

  })();

  ConnectPacket = (function(_super) {
    __extends(ConnectPacket, _super);

    function ConnectPacket() {
      _ref = ConnectPacket.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ConnectPacket.prototype.appObject = function() {
      var object;
      object = {
        app: '',
        flashVer: 'WIN 10,1,85,3',
        swfUrl: 'app:/mod_ser.dat',
        tcUrl: 'rtmps://beta.lol.riotgames.com:2099',
        fpad: false,
        capabilities: 239,
        audioCodecs: 3191,
        videoCodecs: 252,
        videoFunction: 1,
        pageUrl: void 0,
        objectEncoding: 3
      };
      return object;
    };

    ConnectPacket.prototype.commandObject = function() {
      var object;
      object = new ASObject();
      object.name = 'flex.messaging.messages.CommandMessage';
      object.object = {
        operation: 5,
        correlationId: '',
        timestamp: 0,
        clientId: null,
        timeToLive: 0,
        messageId: '9DC6600E-8F54-604F-AB39-1515B4CBE8AA',
        destination: '',
        headers: {
          DSMessagingVersion: 1,
          DSId: 'my-rtmps'
        },
        body: {}
      };
      return object;
    };

    return ConnectPacket;

  })(Packet);

  LoginPacket = (function(_super) {
    __extends(LoginPacket, _super);

    function LoginPacket() {
      LoginPacket.__super__.constructor.apply(this, arguments);
      console.log(this.options);
    }

    LoginPacket.prototype.generate = function(clientVersion) {
      var object;
      object = new ASObject();
      object.name = 'flex.messaging.messages.RemotingMessage';
      object.object = {
        operation: 'login',
        source: null,
        timestamp: 0,
        clientId: null,
        timeToLive: 0,
        messageId: uuid().toUpperCase(),
        destination: 'loginService',
        headers: this.generateHeaders(),
        body: [this.generateBody(clientVersion)]
      };
      object.encoding = 0;
      return object;
    };

    LoginPacket.prototype.generateHeaders = function() {
      var headers;
      headers = new ASObject();
      headers.name = '';
      headers.object = {
        DSId: this.options.dsid,
        DSRequestTimeout: 60,
        DSEndpoint: 'my-rtmps'
      };
      headers.encoding = 2;
      return headers;
    };

    LoginPacket.prototype.generateBody = function(clientVersion) {
      var body;
      if (clientVersion === null) {
        clientVersion = '3.9.13_07_01_27';
      }
      body = new ASObject();
      body.name = 'com.riotgames.platform.login.AuthenticationCredentials';
      body.object = {
        oldPassword: null,
        password: this.options.password,
        authToken: this.options.queueToken,
        locale: 'en_GB',
        partnerCredentials: null,
        ipAddress: '203.59.95.218',
        domain: 'lolclient.lol.riotgames.com',
        username: this.options.username,
        clientVersion: clientVersion,
        securityAnswer: null
      };
      body.encoding = 0;
      return body;
    };

    return LoginPacket;

  })(Packet);

  AuthPacket = (function(_super) {
    __extends(AuthPacket, _super);

    function AuthPacket() {
      _ref1 = AuthPacket.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    AuthPacket.prototype.generate = function() {
      var object;
      object = new ASObject();
      object.name = 'flex.messaging.messages.CommandMessage';
      object.object = {
        operation: 8,
        correlationId: '',
        timestamp: 0,
        clientId: null,
        timeToLive: 0,
        messageId: uuid().toUpperCase(),
        destination: 'auth',
        headers: this.generateHeaders(),
        body: new Buffer("" + this.options.username + ":" + this.options.authToken, 'utf8').toString('base64')
      };
      object.encoding = 0;
      return object;
    };

    AuthPacket.prototype.generateHeaders = function() {
      var headers;
      headers = new ASObject();
      headers.name = '';
      headers.object = {
        DSId: this.options.dsid,
        DSRequestTimeout: 60,
        DSEndpoint: 'my-rtmps'
      };
      headers.encoding = 2;
      return headers;
    };

    return AuthPacket;

  })(Packet);

  HeartbeatPacket = (function(_super) {
    __extends(HeartbeatPacket, _super);

    function HeartbeatPacket() {
      _ref2 = HeartbeatPacket.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    HeartbeatPacket.prototype.counter = 1;

    HeartbeatPacket.prototype.generate = function() {
      var object;
      object = new ASObject();
      object.name = 'flex.messaging.messages.RemotingMessage';
      object.object = {
        operation: 'performLCDSHeartBeat',
        source: null,
        timestamp: 0,
        clientId: null,
        timeToLive: 0,
        messageId: uuid().toUpperCase(),
        destination: 'loginService',
        headers: this.generateHeaders(),
        body: [this.options.acctId, this.options.authToken, this.counter, new Date().toString().slice(0, -6)]
      };
      object.encoding = 0;
      this.counter += 1;
      return object;
    };

    HeartbeatPacket.prototype.generateHeaders = function() {
      var headers;
      headers = new ASObject();
      headers.name = '';
      headers.object = {
        DSId: this.options.dsid,
        DSRequestTimeout: 60,
        DSEndpoint: 'my-rtmps'
      };
      headers.encoding = 2;
      return headers;
    };

    return HeartbeatPacket;

  })(Packet);

  LookupPacket = (function(_super) {
    __extends(LookupPacket, _super);

    function LookupPacket() {
      _ref3 = LookupPacket.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    LookupPacket.prototype.generate = function(name) {
      var object;
      object = new ASObject();
      object.name = 'flex.messaging.messages.RemotingMessage';
      object.object = {
        operation: 'getSummonerByName',
        source: null,
        timestamp: 0,
        clientId: null,
        timeToLive: 0,
        messageId: uuid().toUpperCase(),
        destination: 'summonerService',
        headers: this.generateHeaders(),
        body: [name]
      };
      object.encoding = 0;
      return object;
    };

    LookupPacket.prototype.generateHeaders = function() {
      var headers;
      headers = new ASObject();
      headers.name = '';
      headers.object = {
        DSId: this.options.dsid,
        DSRequestTimeout: 60,
        DSEndpoint: 'my-rtmps'
      };
      headers.encoding = 2;
      return headers;
    };

    return LookupPacket;

  })(Packet);

  SummonerNamesPacket = (function(_super) {
    __extends(SummonerNamesPacket, _super);

    function SummonerNamesPacket() {
      _ref3 = SummonerNamesPacket.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    SummonerNamesPacket.prototype.generate = function(ids) {
      var object;
      object = new ASObject();
      object.name = 'flex.messaging.messages.RemotingMessage';
      object.object = {
        operation: 'getSummonerNames',
        source: null,
        timestamp: 0,
        clientId: null,
        timeToLive: 0,
        messageId: uuid().toUpperCase(),
        destination: 'summonerService',
        headers: this.generateHeaders(),
        body: [ids]
      };
      object.encoding = 0;
      return object;
    };

    SummonerNamesPacket.prototype.generateHeaders = function() {
      var headers;
      headers = new ASObject();
      headers.name = '';
      headers.object = {
        DSId: this.options.dsid,
        DSRequestTimeout: 60,
        DSEndpoint: 'my-rtmps'
      };
      headers.encoding = 2;
      return headers;
    };

    return SummonerNamesPacket;

  })(Packet);

  GetSummonerDataPacket = (function(_super) {
    __extends(GetSummonerDataPacket, _super);

    function GetSummonerDataPacket() {
      _ref4 = GetSummonerDataPacket.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    GetSummonerDataPacket.prototype.generate = function(acctId) {
      var object;
      object = new ASObject();
      object.name = 'flex.messaging.messages.RemotingMessage';
      object.object = {
        operation: 'getAllPublicSummonerDataByAccount',
        source: null,
        timestamp: 0,
        clientId: null,
        timeToLive: 0,
        messageId: uuid().toUpperCase(),
        destination: 'summonerService',
        headers: this.generateHeaders(),
        body: [acctId]
      };
      object.encoding = 0;
      return object;
    };

    GetSummonerDataPacket.prototype.generateHeaders = function() {
      var headers;
      headers = new ASObject();
      headers.name = '';
      headers.object = {
        DSId: this.options.dsid,
        DSRequestTimeout: 60,
        DSEndpoint: 'my-rtmps'
      };
      headers.encoding = 2;
      return headers;
    };

    return GetSummonerDataPacket;

  })(Packet);

  AggregatedStatsPacket = (function(_super) {
    __extends(AggregatedStatsPacket, _super);

    function AggregatedStatsPacket() {
      _ref5 = AggregatedStatsPacket.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    AggregatedStatsPacket.prototype.generate = function(acctId) {
      var object;
      object = new ASObject();
      object.name = 'flex.messaging.messages.RemotingMessage';
      object.object = {
        operation: 'getAggregatedStats',
        source: null,
        timestamp: 0,
        clientId: null,
        timeToLive: 0,
        messageId: uuid().toUpperCase(),
        destination: 'playerStatsService',
        headers: this.generateHeaders(),
        body: [acctId, 'CLASSIC', 'CURRENT']
      };
      object.encoding = 0;
      return object;
    };

    AggregatedStatsPacket.prototype.generateHeaders = function() {
      var headers;
      headers = new ASObject();
      headers.name = '';
      headers.object = {
        DSId: this.options.dsid,
        DSRequestTimeout: 60,
        DSEndpoint: 'my-rtmps'
      };
      headers.encoding = 2;
      return headers;
    };

    return AggregatedStatsPacket;

  })(Packet);

  PlayerStatsPacket = (function(_super) {
    __extends(PlayerStatsPacket, _super);

    function PlayerStatsPacket() {
      _ref6 = PlayerStatsPacket.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    PlayerStatsPacket.prototype.generate = function(acctId) {
      var object;
      object = new ASObject();
      object.name = 'flex.messaging.messages.RemotingMessage';
      object.object = {
        operation: 'retrievePlayerStatsByAccountId',
        source: null,
        timestamp: 0,
        clientId: null,
        timeToLive: 0,
        messageId: uuid().toUpperCase(),
        destination: 'playerStatsService',
        headers: this.generateHeaders(),
        body: [acctId, 'CURRENT']
      };
      object.encoding = 0;
      return object;
    };

    PlayerStatsPacket.prototype.generateHeaders = function() {
      var headers;
      headers = new ASObject();
      headers.name = '';
      headers.object = {
        DSId: this.options.dsid,
        DSRequestTimeout: 60,
        DSEndpoint: 'my-rtmps'
      };
      headers.encoding = 2;
      return headers;
    };

    return PlayerStatsPacket;

  })(Packet);

  RecentGames = (function(_super) {
    __extends(RecentGames, _super);

    function RecentGames() {
      _ref7 = RecentGames.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    RecentGames.prototype.generate = function(acctId) {
      var object;
      object = new ASObject();
      object.name = 'flex.messaging.messages.RemotingMessage';
      object.object = {
        operation: 'getRecentGames',
        source: null,
        timestamp: 0,
        clientId: null,
        timeToLive: 0,
        messageId: uuid().toUpperCase(),
        destination: 'playerStatsService',
        headers: this.generateHeaders(),
        body: [acctId]
      };
      object.encoding = 0;
      return object;
    };

    RecentGames.prototype.generateHeaders = function() {
      var headers;
      headers = new ASObject();
      headers.name = '';
      headers.object = {
        DSId: this.options.dsid,
        DSRequestTimeout: 60,
        DSEndpoint: 'my-rtmps'
      };
      headers.encoding = 2;
      return headers;
    };

    return RecentGames;

  })(Packet);

  GetTeamForSummoner = (function(_super) {
    __extends(GetTeamForSummoner, _super);

    function GetTeamForSummoner() {
      _ref8 = GetTeamForSummoner.__super__.constructor.apply(this, arguments);
      return _ref8;
    }

    GetTeamForSummoner.prototype.generate = function(summonerId) {
      var object;
      object = new ASObject();
      object.name = 'flex.messaging.messages.RemotingMessage';
      object.object = {
        operation: 'findPlayer',
        source: null,
        timestamp: 0,
        clientId: null,
        timeToLive: 0,
        messageId: uuid().toUpperCase(),
        destination: 'summonerTeamService',
        headers: this.generateHeaders(),
        body: [summonerId]
      };
      object.encoding = 0;
      return object;
    };

    GetTeamForSummoner.prototype.generateHeaders = function() {
      var headers;
      headers = new ASObject();
      headers.name = '';
      headers.object = {
        DSId: this.options.dsid,
        DSRequestTimeout: 60,
        DSEndpoint: 'my-rtmps'
      };
      headers.encoding = 2;
      return headers;
    };

    return GetTeamForSummoner;

  })(Packet);

// OWN CODE. retrieveInProgressSpectatorGameInfo


  GetInProgressMatch = (function(_super) {
    __extends(GetInProgressMatch, _super);

    function GetInProgressMatch() {
      _ref8 = GetInProgressMatch.__super__.constructor.apply(this, arguments);
      return _ref8;
    }

    GetInProgressMatch.prototype.generate = function(summonerId) {
      var object;
      object = new ASObject();
      object.name = 'flex.messaging.messages.RemotingMessage';
      object.object = {
        operation: 'retrieveInProgressSpectatorGameInfo',
        source: null,
        timestamp: 0,
        clientId: null,
        timeToLive: 0,
        messageId: uuid().toUpperCase(),
        destination: 'gameService',
        headers: this.generateHeaders(),
        body: [summonerId]
      };
      object.encoding = 0;
      return object;
    };

    GetInProgressMatch.prototype.generateHeaders = function() {
      var headers;
      headers = new ASObject();
      headers.name = '';
      headers.object = {
        DSId: this.options.dsid,
        DSRequestTimeout: 60,
        DSEndpoint: 'my-rtmps'
      };
      headers.encoding = 2;
      return headers;
    };

    return GetInProgressMatch;

  })(Packet);


  //retrieveInProgressSpectatorGameInfo end
  


  GetTeamById = (function(_super) {
    __extends(GetTeamById, _super);

    function GetTeamById() {
      _ref9 = GetTeamById.__super__.constructor.apply(this, arguments);
      return _ref9;
    }

    GetTeamById.prototype.generate = function(teamId) {
      var object;
      object = new ASObject();
      object.name = 'flex.messaging.messages.RemotingMessage';
      object.object = {
        operation: 'findTeamById',
        source: null,
        timestamp: 0,
        clientId: null,
        timeToLive: 0,
        messageId: uuid().toUpperCase(),
        destination: 'summonerTeamService',
        headers: this.generateHeaders(),
        body: [this.generateBody(teamId)]
      };
      object.encoding = 0;
      return object;
    };

    GetTeamById.prototype.generateBody = function(teamId) {
      var body;
      body = new ASObject();
      body.name = 'com.riotgames.team.TeamId';
      body.object = {
        dataVersion: null,
        fullId: teamId,
        futureData: null
      };
      body.encoding = 0;
      return body;
    };

    GetTeamById.prototype.generateHeaders = function() {
      var headers;
      headers = new ASObject();
      headers.name = '';
      headers.object = {
        DSId: this.options.dsid,
        DSRequestTimeout: 60,
        DSEndpoint: 'my-rtmps'
      };
      headers.encoding = 2;
      return headers;
    };

    return GetTeamById;

  })(Packet);

  exports.ConnectPacket = ConnectPacket;

  exports.LoginPacket = LoginPacket;

  exports.AuthPacket = AuthPacket;

  exports.HeartbeatPacket = HeartbeatPacket;

  exports.LookupPacket = LookupPacket;

  exports.GetSummonerDataPacket = GetSummonerDataPacket;

  exports.AggregatedStatsPacket = AggregatedStatsPacket;

  exports.PlayerStatsPacket = PlayerStatsPacket;

  exports.RecentGames = RecentGames;

  exports.GetTeamForSummoner = GetTeamForSummoner;

  exports.GetTeamById = GetTeamById;

  exports.GetInProgressMatch = GetInProgressMatch

}).call(this);
