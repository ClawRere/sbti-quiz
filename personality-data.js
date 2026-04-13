// ═══════════════════════════════════════════════════════════════
// 中式人格测试 · 人格数据文件
// v2.0 新算法：基于13维度得分直接匹配，展示多个人格概率
// ═══════════════════════════════════════════════════════════════

// ═══ 13维度中文名 ═══
var DIM_NAMES = {
  s:'社交活跃', m:'理财态度', r:'关系黏度', i:'信息获取',
  c:'消费观', w:'网瘾程度', g:'工作态度', h:'健康作息',
  a:'记仇程度', j:'计划性', l:'群聊活跃', d:'独处倾向', t:'逃避倾向'
};

// ═══ 普通人格（35型，基础概率 1.5%~5%） ═══
// 每个维度的值范围：-2~3（归一化后0~100）
const TYPES = {

  // ══ 社交与金钱 ══
  '社牛现金王': {
    cn:'社牛现金王', name:'CashKing',
    d:'朋友圈的社交天花板兼钱包担当。红包最大份，聚餐你买单，图个开心。',
    s:'钱是赚来花的，快乐最重要',
    tags:['社交天花板','人情世故','及时行乐'],
    dcols:{s:3,m:2,r:3,i:1,c:-1,w:0,g:2,h:-1,a:-1,j:1,l:2,d:0,t:-1},
    base_rate:3.5, rare:false,
    cp_with:'铁公鸡财神', opp_with:'佛系大师'
  },
  '现金王者': {
    cn:'现金王者', name:'MoneyMaster',
    d:'钱是赚来的不是省来的。大开大合，愿意为品质和机会下重注。',
    s:'省钱的终点是省钱，赚钱的终点是自由',
    tags:['搞钱达人','品质生活','投资眼光'],
    dcols:{s:1,m:3,r:1,i:0,c:2,w:2,g:3,h:1,a:-1,j:2,l:1,d:1,t:0},
    base_rate:2.5, rare:false,
    cp_with:'薅羊毛大师', opp_with:'外卖自由王'
  },
  '红包教父': {
    cn:'红包教父', name:'RedEnvMaster',
    d:'红包发得比光速快。一喊就到，红包是入场券，是存在感。',
    s:'红包发出去的是钱，收回来的是人情',
    tags:['社交投资','人情高手','热心肠'],
    dcols:{s:3,m:-1,r:3,i:1,c:1,w:-1,g:1,h:0,a:0,j:1,l:3,d:-2,t:1},
    base_rate:2.0, rare:false,
    cp_with:'断舍离高手', opp_with:'独行侠'
  },
  '铁公鸡财神': {
    cn:'铁公鸡财神', name:'TightwadDeity',
    d:'每分钱都花在刀刃上。能不发就不发，账户数字悄悄变大。',
    s:'铁公鸡也有春天，当资产够大时',
    tags:['精打细算','长期主义','财务稳健'],
    dcols:{s:-1,m:3,r:0,i:0,c:3,w:-1,g:0,h:-1,a:0,j:3,l:0,d:2,t:0},
    base_rate:3.0, rare:false,
    cp_with:'社牛现金王', opp_with:'氪金大佬'
  },
  '外卖鉴定大师': {
    cn:'外卖鉴定大师', name:'DeliveryMaster',
    d:'外卖吃出了博士学位。哪家的卤肉饭最正宗，性价比之王了如指掌。',
    s:'会选外卖的人，做人也挑不出毛病',
    tags:['外卖专家','精打细算','生活达人'],
    dcols:{s:0,m:1,r:0,i:2,c:1,w:2,g:0,h:1,a:2,j:1,l:1,d:-1,t:0},
    base_rate:2.5, rare:false,
    cp_with:'早睡早起侠', opp_with:'游戏成瘾'
  },
  '外卖自由王': {
    cn:'外卖自由王', name:'DeliveryKing',
    d:'价格不敏感，对品质很敏感。从不看价格，只看评分。',
    s:'对自己好一点，不需要理由',
    tags:['品质生活','消费大方','体验派'],
    dcols:{s:1,m:-1,r:0,i:2,c:-1,w:2,g:0,h:-1,a:1,j:1,l:0,d:-2,t:0},
    base_rate:1.8, rare:false,
    cp_with:'技术宅', opp_with:'铁公鸡财神'
  },

  // ══ 作息与生活 ══
  '夜猫哲学家': {
    cn:'夜猫哲学家', name:'NightOwlPhilosopher',
    d:'灵魂属于深夜。23点才是一天的开始，凌晨3点还在和自己对话。',
    s:'夜里想通的事，白天往往不敢做',
    tags:['熬夜冠军','深夜思考','独处高手'],
    dcols:{s:0,m:0,r:-2,i:1,c:1,w:3,g:0,h:3,a:1,j:0,l:0,d:-1,t:1},
    base_rate:2.5, rare:false,
    cp_with:'早睡早起侠', opp_with:'躺平宗师'
  },
  '早睡早起侠': {
    cn:'早睡早起侠', name:'EarlyBirdHero',
    d:'朋友圈唯一准时睡觉的人。22点道晚安，6点说早安，人生像作息一样规律。',
    s:'自律给我自由——但偶尔也想夜蒲',
    tags:['自律达人','作息规律','正能量'],
    dcols:{s:-1,m:0,r:0,i:0,c:0,w:-1,g:0,h:-2,a:1,j:0,l:0,d:2,t:0},
    base_rate:2.0, rare:false,
    cp_with:'夜猫哲学家', opp_with:'手机奴隶'
  },
  '手机奴隶': {
    cn:'手机奴隶', name:'PhoneSlave',
    d:'手机比你更了解你。刷手机的时间可以绕地球一圈，收入是零。',
    s:'手机里的世界很精彩，手放开的时候最真实',
    tags:['手机成瘾','碎片时间','低头族'],
    dcols:{s:0,m:0,r:0,i:0,c:1,w:3,g:0,h:3,a:1,j:1,l:2,d:-1,t:1},
    base_rate:3.5, rare:false,
    cp_with:'独行侠', opp_with:'早睡早起侠'
  },
  '自律达人': {
    cn:'自律达人', name:'DisciplineMaster',
    d:'朋友圈的自律传说。跑步、读书、单词、冥想，日程表比人生规划还满。',
    s:'自律不是目的，自由才是',
    tags:['超级自律','目标感强','自我管理'],
    dcols:{s:-1,m:0,r:1,i:1,c:1,w:-1,g:3,h:1,a:0,j:3,l:-1,d:-1,t:0},
    base_rate:2.0, rare:false,
    cp_with:'氪金大佬', opp_with:'躺平宗师'
  },
  '记仇小本本': {
    cn:'记仇小本本', name:'GrudgeKeeper',
    d:'只记伤害过你的人，一笔一画。你只是笑笑，格局小？',
    s:'记仇是本能，不记是修行',
    tags:['记仇达人','恩怨分明','高敏感'],
    dcols:{s:0,m:1,r:-2,i:2,c:1,w:1,g:-1,h:-1,a:3,j:0,l:1,d:-2,t:1},
    base_rate:2.0, rare:false,
    cp_with:'佛系大师', opp_with:'社牛现金王'
  },
  '佛系大师': {
    cn:'佛系大师', name:'ZenMaster',
    d:'随便、都行、没关系。不争不抢，岁月静好。',
    s:'佛系是种选择，不是无奈',
    tags:['佛系生活','情绪稳定','包容心强'],
    dcols:{s:-1,m:1,r:0,i:0,c:0,w:0,g:-1,h:-1,a:-1,j:-2,l:0,d:3,t:2},
    base_rate:3.5, rare:false,
    cp_with:'记仇小本本', opp_with:'内卷之王'
  },
  '内卷之王': {
    cn:'内卷之王', name:'InvolutionKing',
    d:'不允许自己停下来。别人下班你在加班，你是最努力的普通人，也是最焦虑的奔跑者。',
    s:'卷到最后，健康比什么都贵',
    tags:['卷王','高成就','拼命三郎'],
    dcols:{s:1,m:0,r:0,i:1,c:1,w:2,g:3,h:0,a:1,j:3,l:0,d:-2,t:0},
    base_rate:3.0, rare:false,
    cp_with:'氪金大佬', opp_with:'佛系大师'
  },
  '躺平宗师': {
    cn:'躺平宗师', name:'FlatMaster',
    d:'悟了。工作、赚钱、社交都不重要，最低能耗生存方式：躺着。',
    s:'只要躺得够平，镰刀就割不到我',
    tags:['躺平','低欲望','反内卷'],
    dcols:{s:-1,m:1,r:1,i:1,c:1,w:-1,g:-1,h:-1,a:-1,j:-1,l:0,d:2,t:2},
    base_rate:2.5, rare:false,
    cp_with:'早睡早起侠', opp_with:'内卷之王'
  },

  // ══ 社交互动 ══
  '社交牛杂': {
    cn:'社交牛杂', name:'SocialMeatball',
    d:'社牛和社恐之间横跳。今天KTV麦霸，明天发布会哑巴，有社交牛杂症。',
    s:'你不是社恐，只是还没遇到让你放开的场子',
    tags:['时内时外','情境切换','真实自我'],
    dcols:{s:0,m:0,r:1,i:0,c:0,w:0,g:0,h:0,a:0,j:1,l:0,d:0,t:1},
    base_rate:5.0, rare:false,
    cp_with:'独行侠', opp_with:'群聊话痨'
  },
  '独行侠': {
    cn:'独行侠', name:'LoneWolf',
    d:'一个人吃饭、一个人看电影、一个人旅行。别人觉得你孤独，你觉得别人才孤独。',
    s:'一个人就是一支队伍',
    tags:['独立自主','内心强大','边界清晰'],
    dcols:{s:-2,m:1,r:1,i:1,c:1,w:0,g:1,h:1,a:0,j:-2,l:-1,d:3,t:0},
    base_rate:2.5, rare:false,
    cp_with:'知心大姐', opp_with:'社交牛杂'
  },
  '群聊话痨': {
    cn:'群聊话痨', name:'GroupChatKing',
    d:'群里没有你接不上的话，没有你不知道的八卦，气氛组组长，深夜话题终结者。',
    s:'群里的热闹是真实的，散场后的冷清也是',
    tags:['群聊达人','气氛组','社交活跃'],
    dcols:{s:2,m:-1,r:1,i:0,c:0,w:0,g:1,h:0,a:0,j:0,l:3,d:-2,t:-1},
    base_rate:4.0, rare:false,
    cp_with:'朋友圈潜水员', opp_with:'独行侠'
  },
  '朋友圈潜水员': {
    cn:'朋友圈潜水员', name:'MomentDiver',
    d:'看了所有人发的朋友圈，但从来没人知道你也在看。点赞偷偷点，从不评论。',
    s:'潜水不是不关心，潜水是更深的关心',
    tags:['潜水达人','观察力强','内心戏足'],
    dcols:{s:-1,m:2,r:0,i:1,c:1,w:0,g:0,h:1,a:1,j:-2,l:-1,d:2,t:0},
    base_rate:4.0, rare:false,
    cp_with:'群聊话痨', opp_with:'戏精本精'
  },
  '亲戚终结者': {
    cn:'亲戚终结者', name:'RelativeTerminator',
    d:'催婚催生、工资多少——每个亲戚的经典问题都得到完美回击。亲戚聚会噩梦，年轻一代精神领袖。',
    s:'终结亲戚话题是技术活',
    tags:['亲戚杀手','边界感强','幽默犀利'],
    dcols:{s:1,m:-1,r:3,i:1,c:1,w:0,g:0,h:-1,a:2,j:1,l:0,d:-1,t:0},
    base_rate:2.0, rare:false,
    cp_with:'佛系大师', opp_with:'催婚反击王'
  },
  '催婚反击王': {
    cn:'催婚反击王', name:'AntiPushback',
    d:'「不急」「没遇到」「先忙事业」三板斧练了十年。不是不想找，只是不想将就。',
    s:'婚姻是人生大事，不应是一场催促下的赶集',
    tags:['独立自主','拒绝催婚','按我节奏'],
    dcols:{s:-1,m:0,r:-1,i:1,c:1,w:0,g:0,h:0,a:1,j:0,l:-1,d:2,t:2},
    base_rate:2.5, rare:false,
    cp_with:'内卷之王', opp_with:'亲戚终结者'
  },

  // ══ 科技数码 ══
  '数码达人': {
    cn:'数码达人', name:'TechGadgetGuru',
    d:'新品追求永无止境。苹果发布会必看，数码博主全关注，买过的产品能开博物馆。',
    s:'买的时候真香，买完吃灰——下次还会买',
    tags:['数码爱好者','追新族','参数党'],
    dcols:{s:0,m:-1,r:1,i:3,c:0,w:2,g:1,h:-1,a:0,j:0,l:1,d:-1,t:-1},
    base_rate:2.5, rare:false,
    cp_with:'技术宅', opp_with:'佛系大师'
  },
  '技术宅': {
    cn:'技术宅', name:'TechOtaku',
    d:'你的世界是二进制的。懂代码、懂系统、聊天记录emoji最少，解决问题效率最高。',
    s:'代码不会骗人，人会——所以你更相信代码',
    tags:['技术大牛','逻辑强','代码诗人'],
    dcols:{s:-1,m:0,r:1,i:3,c:1,w:2,g:2,h:-1,a:-1,j:1,l:-1,d:0,t:0},
    base_rate:2.5, rare:false,
    cp_with:'数码达人', opp_with:'群聊话痨'
  },
  '游戏成瘾': {
    cn:'游戏成瘾', name:'GameAddict',
    d:'段位是人生履历，装备是人格外挂。游戏里是王者，现实里可能还在青铜。',
    s:'游戏段位再高，也换不来现实的一顿饭钱',
    tags:['游戏重度','虚拟王者','逃避现实'],
    dcols:{s:0,m:0,r:-1,i:1,c:0,w:3,g:0,h:3,a:0,j:0,l:2,d:-2,t:0},
    base_rate:2.5, rare:false,
    cp_with:'技术宅', opp_with:'早睡早起侠'
  },
  '氪金大佬': {
    cn:'氪金大佬', name:'Whale',
    d:'你不追游戏，你养游戏。648眼都不眨，抽的不是卡，是梦想是多巴胺是优越感。',
    s:'648不是钱，是通往快乐的门',
    tags:['氪金玩家','冲动消费','游戏投入'],
    dcols:{s:1,m:0,r:-1,i:2,c:0,w:2,g:0,h:3,a:1,j:0,l:1,d:-1,t:1},
    base_rate:1.5, rare:false,
    cp_with:'内卷之王', opp_with:'铁公鸡财神'
  },

  // ══ 消费购物 ══
  '购物狂魔': {
    cn:'购物狂魔', name:'Shopaholic',
    d:'快递比你先到家，花呗比你先爆。清空购物车那一刻人生圆满，然后又看新的。',
    s:'拆快递那一刻是全世界最快乐的人',
    tags:['购物成瘾','拆快递达人','即时满足'],
    dcols:{s:1,m:-1,r:1,i:2,c:-1,w:2,g:-1,h:3,a:0,j:1,l:0,d:-1,t:0},
    base_rate:2.5, rare:false,
    cp_with:'铁公鸡财神', opp_with:'断舍离高手'
  },
  '薅羊毛大师': {
    cn:'薅羊毛大师', name:'DealHunter',
    d:'三头六臂，找到全网所有优惠券。为省10块花1小时研究，为免费奶茶拉30个人头。',
    s:'省下的钱是小钱，花的时间也是钱',
    tags:['省钱达人','性价比','攻略能力'],
    dcols:{s:1,m:3,r:0,i:0,c:3,w:1,g:0,h:0,a:0,j:2,l:1,d:-1,t:0},
    base_rate:2.0, rare:false,
    cp_with:'现金王者', opp_with:'购物狂魔'
  },
  '断舍离高手': {
    cn:'断舍离高手', name:'MinimalistMaster',
    d:'定期清理房间、衣柜、朋友圈。少即是多，朋友圈里最轻盈的人。',
    s:'拥有的东西少了，烦恼也少了',
    tags:['极简主义','定期断舍离','轻盈生活'],
    dcols:{s:-1,m:0,r:1,i:0,c:3,w:-1,g:1,h:1,a:1,j:-1,l:-1,d:2,t:-1},
    base_rate:2.0, rare:false,
    cp_with:'佛系大师', opp_with:'购物狂魔'
  },

  // ══ 情感人际 ══
  '八卦情报员': {
    cn:'八卦情报员', name:'GossipAgent',
    d:'朋友圈情报中心。谁和谁在一起，谁偷偷换工作，你永远第一个知道。',
    s:'八卦是了解一个人最快速的方式',
    tags:['情报高手','社交广泛','洞察力强'],
    dcols:{s:2,m:-1,r:3,i:1,c:1,w:0,g:0,h:-1,a:0,j:0,l:3,d:-2,t:-1},
    base_rate:2.0, rare:false,
    cp_with:'人精', opp_with:'朋友圈潜水员'
  },
  '人精': {
    cn:'人精', name:'SocialAnimal',
    d:'读得懂空气，分得清眉眼高低。社交场合游刃有余，人际博弈中所向披靡。',
    s:'看透人心是本事，利用人心是选择',
    tags:['社交高手','洞察力强','人际高手'],
    dcols:{s:2,m:0,r:2,i:1,c:1,w:1,g:0,h:-1,a:0,j:0,l:1,d:-2,t:0},
    base_rate:1.8, rare:false,
    cp_with:'八卦情报员', opp_with:'社恐患者'
  },
  '情感专家': {
    cn:'情感专家', name:'RelationshipExpert',
    d:'分析别人头头是道，轮到自己就犯糊涂。最好的闺蜜/兄弟，却是最差的恋人。',
    s:'你能看清别人的心，却看不清自己的',
    tags:['情感导师','共情高手','分析能力强'],
    dcols:{s:1,m:-1,r:3,i:1,c:-1,w:0,g:0,h:2,a:1,j:0,l:0,d:-1,t:1},
    base_rate:2.0, rare:false,
    cp_with:'知心大姐', opp_with:'记仇小本本'
  },
  '戏精本精': {
    cn:'戏精本精', name:'DramaQueen',
    d:'朋友圈就是个人舞台，每条都是精心设计的表演。本色出演，每出戏都信以为真。',
    s:'演技太好有时候也是一种痛苦',
    tags:['表演型','社交达人','情绪丰富'],
    dcols:{s:3,m:-1,r:0,i:0,c:-1,w:1,g:0,h:0,a:0,j:0,l:3,d:-1,t:1},
    base_rate:1.8, rare:false,
    cp_with:'社交牛杂', opp_with:'朋友圈潜水员'
  },
  '知心大姐': {
    cn:'知心大姐', name:'BigSisterHeart',
    d:'被朋友找来做情感咨询的。倾听、分析、给建议，总说对——自己遇到问题时也需要一个知心大姐。',
    s:'你总给别人撑伞，却忘了自己也会被淋湿',
    tags:['知心姐姐','倾听者','共情高手'],
    dcols:{s:1,m:0,r:3,i:1,c:0,w:-1,g:-1,h:2,a:1,j:0,l:1,d:-1,t:1},
    base_rate:2.5, rare:false,
    cp_with:'独行侠', opp_with:'人精'
  },
  '孤独患者': {
    cn:'孤独患者', name:'LonelySoul',
    d:'人群中感到孤独，独处时更孤独。社交账号很多，能说心里话的很少。最热闹的孤独者。',
    s:'孤独是一种选择，也是一种惩罚',
    tags:['孤独患者','内心戏多','渴望连接'],
    dcols:{s:-1,m:1,r:3,i:1,c:0,w:0,g:0,h:2,a:1,j:0,l:-1,d:1,t:0},
    base_rate:2.5, rare:false,
    cp_with:'知心大姐', opp_with:'群聊话痨'
  },
  '社恐患者': {
    cn:'社恐患者', name:'SocialPhobic',
    d:'害怕聚会、打电话、点餐。沉默不是高冷，是真的不知道该说什么。',
    s:'你不是不喜欢人，只是不知道怎么相处',
    tags:['社恐','独处爱好者','内心丰富'],
    dcols:{s:-2,m:1,r:0,i:1,c:1,w:0,g:0,h:1,a:0,j:1,l:-1,d:2,t:1},
    base_rate:3.5, rare:false,
    cp_with:'独行侠', opp_with:'人精'
  },

  // ══ 职场工作 ══
  '职场老黄牛': {
    cn:'职场老黄牛', name:'WorkHorse',
    d:'公司干活最多，被夸最少。加班最多，升职最慢。总觉得做得够好，老板不这么认为。',
    s:'会做也要会说，不会说就要会表现',
    tags:['勤勤恳恳','埋头苦干','服从性强'],
    dcols:{s:-1,m:0,r:1,i:1,c:0,w:2,g:2,h:0,a:-1,j:0,l:0,d:1,t:1},
    base_rate:3.0, rare:false,
    cp_with:'人精', opp_with:'职场人际王'
  },
  '职场人际王': {
    cn:'职场人际王', name:'OfficePoliticsKing',
    d:'办公室最会搞关系的人。领导喜欢，同事不讨厌，客户信任。不一定最强，但最会借力。',
    s:'关系是生产力，专业是底气，两者兼备才是真王',
    tags:['职场高手','关系经营','借力打力'],
    dcols:{s:3,m:-1,r:3,i:1,c:0,w:1,g:0,h:-1,a:0,j:1,l:1,d:-1,t:-1},
    base_rate:1.5, rare:false,
    cp_with:'职场老黄牛', opp_with:'技术宅'
  },

  // ══ 稀有极端人格（概率 0.3%~0.8%） ══
  '修仙党': {
    cn:'修仙党', name:'AsceticMaster',
    d:'看破红尘的存在。不工作、不社交、不消费。每天打坐、冥想、研究人生意义。物质世界的任何事都与你无关。',
    s:'色即是空，空即是色',
    tags:['修仙','出世','极简','稀有'],
    dcols:{s:-2,m:2,r:-2,i:1,c:3,w:-1,g:-2,h:1,a:-2,j:-2,l:-2,d:3,t:3},
    base_rate:0.5, rare:true,
    cp_with:'佛系大师', opp_with:'氪金大佬'
  },
  '工作狂魔': {
    cn:'工作狂魔', name:'Workaholic',
    d:'工作是生命的全部。周末不休息，加班不抱怨，假期还在工作。工作以外没有任何生活。',
    s:'休息是可耻的，工作是神圣的',
    tags:['工作狂','极致卷','无生活','稀有'],
    dcols:{s:-1,m:2,r:-1,i:2,c:1,w:1,g:3,h:2,a:1,j:3,l:-2,d:-1,t:-1},
    base_rate:0.4, rare:true,
    cp_with:'内卷之王', opp_with:'躺平宗师'
  },
  '社交恐惧症重度': {
    cn:'社交恐惧症重度', name:'SevereSocialPhobic',
    d:'完全回避社交。打电话恐惧，见人恐惧，语音恐惧，视频恐惧。出门办事需要做很久心理建设。',
    s:'我不是不喜欢人，我是真的害怕人',
    tags:['重度社恐','回避社交','内心丰富','稀有'],
    dcols:{s:-3,m:1,r:-2,i:0,c:1,w:0,g:0,h:0,a:0,j:0,l:-3,d:3,t:2},
    base_rate:0.5, rare:true,
    cp_with:'独行侠', opp_with:'群聊话痨'
  },
  '购物狂（破产边缘）': {
    cn:'购物狂（破产边缘）', name:'ShoppingBankrupt',
    d:'花呗、借呗、信用卡，全部刷爆。下个月工资还没到就已经预支了。快递多到要专门买柜子装，但还是有新的在路上。',
    s:'我已经不在乎了，破罐子破摔',
    tags:['购物成瘾','财务危机','破产边缘','稀有'],
    dcols:{s:2,m:-2,r:2,i:2,c:-3,w:2,g:-1,h:2,a:1,j:-1,l:1,d:-1,t:1},
    base_rate:0.4, rare:true,
    cp_with:'铁公鸡财神', opp_with:'断舍离高手'
  },
  '游戏职业选手': {
    cn:'游戏职业选手', name:'ProGamer',
    d:'游戏是你的职业、事业、生活。日均游戏时长超过10小时，有战队、有粉丝、有比赛。世界对你来说分为游戏内和游戏外。',
    s:'游戏不只是游戏，游戏是另一个人生',
    tags:['职业电竞','游戏沉迷','虚拟人生','稀有'],
    dcols:{s:1,m:0,r:-1,i:3,c:0,w:3,g:2,h:3,a:0,j:0,l:1,d:-1,t:1},
    base_rate:0.3, rare:true,
    cp_with:'技术宅', opp_with:'早睡早起侠'
  },
  '情感黑洞': {
    cn:'情感黑洞', name:'EmotionalVoid',
    d:'不断索取别人的情感能量。朋友、同事、伴侣，都被你的情绪消耗殆尽。你身边的关系一个接一个断裂。',
    s:'我不是故意的，但我就是停不下来',
    tags:['情感索取','关系消耗','黑洞','稀有'],
    dcols:{s:2,m:0,r:-3,i:0,c:1,w:1,g:0,h:0,a:2,j:-1,l:2,d:0,t:2},
    base_rate:0.3, rare:true,
    cp_with:'独行侠', opp_with:'知心大姐'
  }
};

// ═══ 人格数量（用于概率计算） ═══
var TOTAL_PERSONALITIES = Object.keys(TYPES).length;

// ═══ 计算维度匹配得分 ═══
// userDims: {dim: score} 每个维度归一化后的得分(0~100)
// 返回: [{key, score, rate}] 按得分降序
function calcDimMatches(userDims) {
  var keys = Object.keys(TYPES);
  var results = [];

  keys.forEach(function(k) {
    var t = TYPES[k];
    // 计算欧几里得距离
    var dist = 0;
    var count = 0;
    Object.keys(userDims).forEach(function(dim) {
      if (t.dcols && t.dcols[dim] !== undefined) {
        // 用户归一化维度(0-100) vs 人格维度(-2~3归一化到0-100)
        var userN = userDims[dim];
        var typeN = ((t.dcols[dim] + 2) / 5) * 100; // -2~3 → 0~100
        var diff = userN - typeN;
        dist += diff * diff;
        count++;
      }
    });
    if (count > 0) {
      var score = 100 - Math.sqrt(dist / count) / 1.5; // 距离转得分
      var rate = t.base_rate || 1.5;
      results.push({key:k, score:Math.max(0, score), baseRate:rate, rare:t.rare||false});
    }
  });

  // 计算概率：基于匹配得分 + 基础概率
  var totalBase = results.reduce(function(s,r){ return s + r.baseRate; }, 0);
  var totalScore = results.reduce(function(s,r){ return s + r.score; }, 0);

  results.forEach(function(r) {
    r.rate = r.score > 0 ? ((r.score / totalScore) * 50 + (r.baseRate / totalBase) * 50) : 0;
  });

  results.sort(function(a,b){ return b.rate - a.rate; });
  return results;
}

// ═══ CP组合 ═══
function getCpList(pt, allTypes) {
  var result = [];
  if (pt.cp_with && allTypes[pt.cp_with]) {
    var cp = allTypes[pt.cp_with];
    result.push({
      type:'best', label:'命定CP', icon:'💑',
      name:cp.cn||cp.name||cp.t,
      tags:cp.tags||[],
      desc:'核心价值观高度一致，相处如鱼得水，是最自然的搭档。',
      compat:92
    });
  }
  // 最佳拍档：相似度高
  var keys = Object.keys(allTypes);
  var bp = null, bpScore = -Infinity;
  keys.forEach(function(k) {
    if (k === pt.cn || k === pt.cp_with) return;
    var t = allTypes[k];
    var dot = 0, dLen = 0, tLen = 0;
    if (t.dcols && pt.dcols) {
      Object.keys(pt.dcols).forEach(function(dim) {
        var dv = pt.dcols[dim];
        dLen += dv*dv;
        if (t.dcols[dim] !== undefined) {
          dot += dv * t.dcols[dim];
          tLen += t.dcols[dim]*t.dcols[dim];
        }
      });
    }
    var cos = (dLen>0&&tLen>0) ? dot/(Math.sqrt(dLen)*Math.sqrt(tLen)) : 0;
    if (cos > bpScore) { bpScore=cos; bp=t }
  });
  if (bp && result.length < 3) {
    result.push({
      type:'buddy', label:'最佳拍档', icon:'🤝',
      name:bp.cn||bp.name||bp.t,
      tags:bp.tags||[],
      desc:'做朋友默契十足，一个眼神就懂对方，是可以互相依靠的搭档。',
      compat:88
    });
  }
  if (pt.opp_with && allTypes[pt.opp_with] && result.length < 3) {
    var opp = allTypes[pt.opp_with];
    result.push({
      type:'contrast', label:'反差CP', icon:'⚡',
      name:opp.cn||opp.name||opp.t,
      tags:opp.tags||[],
      desc:'性格互补，彼此能学到对方长处，是很有火花的一对。',
      compat:78
    });
  }
  return result;
}

// ═══ 人格对比 ═══
function getCompareList(pt, allTypes) {
  var result = [];
  var myKey = pt.cn || pt.name || pt.t;
  var keys = Object.keys(allTypes);

  // 相似人格
  var similar=null, simScore=-Infinity;
  keys.forEach(function(k) {
    if (k===myKey) return;
    var t=allTypes[k];
    var dot=0,dLen=0,tLen=0;
    if (t.dcols&&pt.dcols) {
      Object.keys(pt.dcols).forEach(function(dim){
        var dv=pt.dcols[dim]; dLen+=dv*dv;
        if (t.dcols[dim]!==undefined) { dot+=dv*t.dcols[dim]; tLen+=t.dcols[dim]*t.dcols[dim]; }
      });
    }
    var cos=(dLen>0&&tLen>0)?dot/(Math.sqrt(dLen)*Math.sqrt(tLen)):0;
    if (cos>simScore){ simScore=cos; similar=t }
  });
  if (similar) result.push({
    type:'similar', label:'相似人格', icon:'🔮',
    name:similar.cn||similar.name||similar.t,
    tags:similar.tags||[],
    desc:'你们有很多共同点，相处时惺惺相惜，沟通成本极低。'
  });

  // 相反人格
  var opposite=null, oppScore=Infinity;
  var simKey=similar?(similar.cn||similar.name||similar.t):null;
  keys.forEach(function(k) {
    if (k===myKey||k===simKey) return;
    var t=allTypes[k];
    var dot=0,dLen=0,tLen=0;
    if (t.dcols&&pt.dcols){
      Object.keys(pt.dcols).forEach(function(dim){
        var dv=pt.dcols[dim]; dLen+=dv*dv;
        if (t.dcols[dim]!==undefined){ dot+=dv*t.dcols[dim]; tLen+=t.dcols[dim]*t.dcols[dim]; }
      });
    }
    var cos=(dLen>0&&tLen>0)?dot/(Math.sqrt(dLen)*Math.sqrt(tLen)):0;
    if (cos<oppScore){ oppScore=cos; opposite=t }
  });
  if (opposite) result.push({
    type:'opposite', label:'相反人格', icon:'🪞',
    name:opposite.cn||opposite.name||opposite.t,
    tags:opposite.tags||[],
    desc:'你们性格截然相反，不同的处事方式碰撞出火花。'
  });

  // 互补人格
  var oppKey=opposite?(opposite.cn||opposite.name||opposite.t):null;
  var comp=null, compScore=-Infinity;
  keys.forEach(function(k){
    if (k===myKey||k===simKey||k===oppKey) return;
    var t=allTypes[k];
    var score=0;
    if (t.dcols&&pt.dcols){
      Object.keys(pt.dcols).forEach(function(dim){
        if (t.dcols[dim]!==undefined){
          var diff=Math.abs(pt.dcols[dim]-t.dcols[dim]);
          if (diff>=1.5&&diff<=2.5) score+=(2.5-Math.abs(2-diff))*0.8;
          else score+=Math.max(0,1-diff*0.2);
        }
      });
    }
    if (score>compScore){ compScore=score; comp=t }
  });
  if (comp) result.push({
    type:'complement', label:'互补人格', icon:'🧩',
    name:comp.cn||comp.name||comp.t,
    tags:comp.tags||[],
    desc:'你们可以互补长短，一个补上另一个的短板，共同成长。'
  });

  return result;
}

// ═══ 中式命理标签 ═══
function genZyTags(dims) {
  var tags=[];
  var s=dims.s||0,m=dims.m||0,r=dims.r||0,i=dims.i||0;
  var c=dims.c||0,w=dims.w||0,g=dims.g||0,h=dims.h||0;
  var a=dims.a||0,j=dims.j||0,l=dims.l||0,d=dims.d||0,t=dims.t||0;

  if (s>2) tags.push('紫微星入命宫');
  else if (g>2) tags.push('武曲星守财帛');
  else if (h>2) tags.push('太阳星照耀');
  else if (i>2) tags.push('天机星聪慧');
  else if (d>2) tags.push('天府星保守');
  else if (a>2) tags.push('天蝎星记仇');
  else if (r>2) tags.push('太阴星温柔');
  else if (w>2) tags.push('文曲星信息');
  else if (j>2) tags.push('天梁星稳重');
  else if (t>2) tags.push('天同星内敛');
  else tags.push('命宫饱满');

  var palaces=[];
  if (g>1) palaces.push('官禄宫强旺');
  else if (r>1) palaces.push('福德宫充盈');
  else if (s>1) palaces.push('迁移宫活跃');
  else if (c>1) palaces.push('田宅宫充盈');
  else if (m>1) palaces.push('财帛宫充盈');
  if (palaces.length>0) tags.push(palaces[Math.floor(Math.random()*palaces.length)]);

  return tags;
}

// ═══ 维度配色 ═══
var DCOLORS=['#e85a4f','#d4a574','#8e7cc3','#52b788','#667eea'];