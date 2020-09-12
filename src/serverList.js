export  default {
  // 商品分类栏目
  classiFication: [
    {
      id:1,
      value: 0,
      label: '办公服务',
      section: '一级',
      children: [{
          id: 2,
          value: 0,
          label: '写字楼',
          section: '二级',
          children: [
            {
              id: 3,
              value: 0,
              label: '写字楼出售',
              section: '三级',
            },
            {
              id: 4,
              value: 1,
              label: '写字楼出租',
              section: '三级',
            },
            {
              id: 5,
              value: 2,
              label: '写字楼转让',
              section: '三级',
            },
            {
              id: 6,
              value: 3,
              label: '卡位出租',
              section: '三级',
            },
            {
              id: 7,
              value: 4,
              label: '卡位出售',
              section: '三级',
            },
            {
              id: 8,
              value: 5,
              label: '办公室装修',
              section: '三级',
            }
          ]
        },
        {
          id: 9,
          value: 1,
          label: '办公硬件',
          section: '二级',
          children: [
            {
              id: 10,
              value: 0,
              label: '办公家具',
              section: '三级',
            },
            {
              id: 11,
              value: 1,
              label: '办公电脑',
              section: '三级',
            },
            {
              id: 12,
              value: 2,
              label: '打印机',
              section: '三级',
            },
            {
              id: 13,
              value: 3,
              label: '办公文具',
              section: '三级',
            },
            {
              id: 14,
              value: 4,
              label: '喷子/花草',
              section: '三级',
            },
            {
              id: 15,
              value: 5,
              label: '其他办公设备',
              section: '三级',
            }
          ]
        },
        {
          id: 16,
          value: 2,
          label: '办公软件',
          section: '二级',
          children: [
            {
              id: 17,
              value: 0,
              label: '财务软件',
              section: '三级',
            },
            {
              id: 18,
              value: 1,
              label: '企业邮箱',
              section: '三级',
            },
            {
              id: 19,
              value: 2,
              label: 'OA系统',
              section: '三级',
            },
            {
              id: 20,
              value: 3,
              label: '通讯软甲',
              section: '三级',
            },
            {
              id: 21,
              value: 4,
              label: '招聘软件',
              section: '三级',
            },
            {
              id: 22,
              value: 5,
              label: '财经软件',
              section: '三级',
            },
            {
              id: 23,
              value: 6,
              label: '人脉软件',
              section: '三级',
            },
          ]
        }
      ],
    },
    {
      id: 24,
      value: 1,
      label: '工商注册',
      section: '一级',
      children: [
        {
          id: 25,
          value: 0,
          label: '公司注册',
          section: '二级',
          children: [
            {
              id: 26,
              value: 0,
              label: '国内公司注册',
              section: '三级',
            },
            {
              id: 27,
              value: 1,
              label: '自贸区公司注册',
              section: '三级',
            },
            {
              id: 28,
              value: 2,
              label: '香港公司注册',
              section: '三级',
            },
            {
              id: 29,
              value: 3,
              label: '海外公司注册',
              section: '三级',
            },
            {
              id: 30,
              value: 0,
              label: '外贸公司注册',
              section: '三级',
            }
          ]
        },
        {
          id: 31,
          value: 1,
          label: '公司变更',
          section: '二级',
          children: [
            {
              id: 32,
              value: 0,
              label: '名称变更',
              section: '三级',
            },
            {
              id: 33,
              value: 1,
              label: '人事/法人变更',
              section: '三级',
            },
            {
              id: 34,
              value: 2,
              label: '股权变更',
              section: '三级',
            },
            {
              id: 35,
              value: 3,
              label: '经营范围变更',
              section: '三级',
            }
          ]
        },
        {
          id: 36,
          value: 2,
          label: '公司注销/异常处理',
          section: '二级',
          children: [
            {
              id: 37,
              value: 0,
              label: '经营异常注销',
              section: '三级',
            },
            {
              id: 38,
              value: 1,
              label: '经营异常移除',
              section: '三级',
            },
            {
              id: 39,
              value: 2,
              label: '正常注销',
              section: '三级',
            },
            {
              id: 40,
              value: 3,
              label: '其他情况注销',
              section: '三级',
            }
          ]
        },
        {
          id: 41,
          value: 3,
          label: '年报/证章/银行',
          section: '二级',
          children: [
            {
              id: 42,
              value: 0,
              label: '工商年报公示',
              section: '三级',
            },
            {
              id: 43,
              value: 1,
              label: '证章丢失补办',
              section: '三级',
            },
            {
              id: 44,
              value: 2,
              label: '银行开户',
              section: '三级',
            },
            {
              id: 45,
              value: 3,
              label: '其他证件补办',
              section: '三级',
            }
          ]
        }
      ]
    },
    {
      id: 46,
      value: 2,
      label: '财税服务',
      section: '一级',
      children: [
        {
          id: 47,
          value: 0,
          label: '代理记账',
          section: '二级',
          children: [
            {
              id: 48,
              value: 0,
              label: '小规模代理记账',
              section: '三级',
            },
            {
              id: 49,
              value: 1,
              label: '一般纳税人代理记账',
              section: '三级',
            },
            {
              id: 50,
              value: 2,
              label: '进出口企业代理记账',
              section: '三级',
            },
          ]
        },
        {
          id: 51,
          value: 1,
          label: '财税待办',
          section: '二级',
          children: [
            {
              id: 52,
              value: 0,
              label: '税控/发票待办',
              section: '三级',
            },
            {
              id: 53,
              value: 1,
              label: '财务报表',
              section: '三级',
            },
            {
              id: 54,
              value: 2,
              label: '财务汇算清缴',
              section: '三级',
            },
            {
              id: 55,
              value: 3,
              label: '税务审计',
              section: '三级',
            }
          ]
        },
        {
          id: 56,
          value: 2,
          label: '会计培训',
          section: '二级',
          children: [
            {
              id: 57,
              value: 0,
              label: '初级会计培训',
              section: '三级',
            },
            {
              id: 58,
              value: 1,
              label: '中级会计培训',
              section: '三级',
            },
            {
              id: 59,
              value: 2,
              label: '高级会计培训',
              section: '三级',
            },
          ]
        },
        {
          id: 60,
          value: 3,
          label: '财务规划',
          section: '二级',
        }
      ]
    },
    {
      id: 61,
      value: 3,
      label: '知识产权',
      section: '一级',
      children: [
        {
          id: 62,
          value: 0,
          label: '商标服务',
          section: '二级',
          children: [
            {
              id: 63,
              value: 0,
              label: '商标注册',
              section: '三级',
            },
            {
              id: 64,
              value: 1,
              label: '国际商标注册',
              section: '三级',
            },
            {
              id: 65,
              value: 2,
              label: '商标无效宣告',
              section: '三级',
            },
            {
              id: 66,
              value: 3,
              label: '商标异议',
              section: '三级',
            },
            {
              id: 67,
              value: 4,
              label: '商标续展',
              section: '三级',
            },
            {
              id: 68,
              value: 5,
              label: '商标驳回复审',
              section: '三级',
            },
            {
              id: 69,
              value: 6,
              label: '商标撤三',
              section: '三级',
            },
            {
              id: 70,
              value: 7,
              label: '其他商标服务',
              section: '三级',
            },
          ]
        },
        {
          id: 71,
          value: 1,
          label: '专利服务',
          section: '二级',
          children: [
            {
              id: 72,
              value: 0,
              label: '专利申请',
              section: '三级',
            },
            {
              id: 73,
              value: 1,
              label: '专利驳回复审',
              section: '三级',
            },
            {
              id: 74,
              value: 2,
              label: '专利无效答辩',
              section: '三级',
            },
            {
              id: 75,
              value: 3,
              label: '专利无效宣告',
              section: '三级',
            },
            {
              id: 76,
              value: 4,
              label: '国际专利申请',
              section: '三级',
            },
            {
              id: 77,
              value: 5,
              label: '其他专利服务',
              section: '三级',
            },
          ]
        },
        {
          id: 78,
          value: 2,
          label: '版权服务',
          section: '二级',
          children: [
            {
              id: 79,
              value: 0,
              label: '软件著作登记',
              section: '三级',
            },
            {
              id: 80,
              value: 1,
              label: '美术作品登记',
              section: '三级',
            },
            {
              id: 81,
              value: 2,
              label: '写作作品登记',
              section: '三级',
            },
            {
              id: 82,
              value: 3,
              label: '版权查询',
              section: '三级',
            },
            {
              id: 83,
              value: 4,
              label: '版权更改',
              section: '三级',
            },
            {
              id: 84,
              value: 5,
              label: '其他版权服务',
              section: '三级',
            }
          ]
        },
        {
          id: 85,
          value: 3,
          label: '贯标服务',
          section: '二级',
          children: [
            {
              id: 86,
              value: 0,
              label: '知识产权贯标',
              section: '三级',
            },
            {
              id: 87,
              value: 1,
              label: '质量管理体系贯标',
              section: '三级',
            },
          ]
        },
        {
          id: 88,
          value: 4,
          label: '项目申报',
          section: '二级',
          children: [
            {
              id: 89,
              value: 0,
              label: '科技项目申报',
              section: '三级',
            },
            {
              id: 90,
              value: 1,
              label: '高新技术企业申报',
              section: '三级',
            },
            {
              id: 91,
              value: 2,
              label: '科研项目申报',
              section: '三级',
            },
          ]
        }
      ]
    },
    {
      id: 92,
      value: 4,
      label: '平台入驻',
      section: '一级',
      children: [
        {
          id: 93,
          value: 0,
          label: '线上平台入驻',
          section: '二级',
          children: [
            {
              id: 95,
              value: 0,
              label: '淘宝/天猫入驻',
              section: '三级',
            },
            {
              id: 96,
              value: 1,
              label: '京东入驻',
              section: '三级',
            },
            {
              id: 97,
              value: 2,
              label: '拼多多入驻',
              section: '三级',
            },
            {
              id: 98,
              value: 3,
              label: '亚马逊入驻',
              section: '三级',
            },
            {
              id: 99,
              value: 4,
              label: '其他平台入驻',
              section: '三级',
            }
          ]
        }
      ]
    },
    {
      id: 100,
      value: 5,
      label: '营销推广',
      section: '一级',
      children: [
        {
          id: 101,
          value: 0,
          label: '网络推广',
          section: '二级',
          children: [
            {
              id: 102,
              value: 0,
              label: 'SEO/SEM',
              section: '三级',
            },
            {
              id: 103,
              value: 1,
              label: '自媒体推广',
              section: '三级',
            },
            {
              id: 104,
              value: 2,
              label: '软件推广',
              section: '三级',
            }
          ]
        },
        {
          id: 105,
          value: 1,
          label: '品牌策划',
          section: '二级',
          children: [
            {
              id: 106,
              value: 0,
              label: 'LOGO设计',
              section: '三级',
            },
            {
              id: 107,
              value: 1,
              label: 'VI设计',
              section: '三级',
            },
            {
              id: 108,
              value: 2,
              label: '宣传画册设计',
              section: '三级',
            },
            {
              id: 109,
              value: 3,
              label: '平面广告设计',
              section: '三级',
            },
            {
              id: 110,
              value: 4,
              label: '视频宣传制作',
              section: '三级',
            },
            {
              id: 111,
              value: 5,
              label: 'VC广告制作',
              section: '三级',
            }
          ]
        },
        {
          id: 112,
          value: 2,
          label: '网络开发',
          section: '二级',
          children: [
            {
              id: 113,
              value: 0,
              label: '网站开发',
              section: '三级',
            },
            {
              id: 114,
              value: 1,
              label: 'APP开发',
              section: '三级',
            },
            {
              id: 115,
              value: 2,
              label: '微信公众号开发',
              section: '三级',
            },
            {
              id: 116,
              value: 3,
              label: '软件开发',
              section: '三级',
            },
            {
              id: 117,
              value: 4,
              label: '视频制作',
              section: '三级',
            },
            {
              id: 118,
              value: 5,
              label: '智能产品开发',
              section: '三级',
            }
          ]
        }
      ]
    },
    {
      id: 119,
      value: 6,
      label: '法律服务',
      section: '一级',
      children: [
        {
          id: 120,
          value: 0,
          label: '法律咨询',
          section: '二级',
          children: [
            {
              id: 121,
              value: 0,
              label: '在线咨询',
              section: '三级',
            },
            {
              id: 122,
              value: 1,
              label: '电话咨询',
              section: '三级',
            },
            {
              id: 123,
              value: 2,
              label: '预约见面',
              section: '三级',
            }
          ]
        },
        {
          id: 124,
          value: 1,
          label: '合同文书',
          section: '二级',
          children: [
            {
              id: 125,
              value: 0,
              label: '合同拟写',
              section: '三级',
            },
            {
              id: 126,
              value: 1,
              label: '合同审核',
              section: '三级',
            },
            {
              id: 127,
              value: 2,
              label: '律师函',
              section: '三级',
            }
          ]
        },
        {
          id: 128,
          value: 2,
          label: '法律顾问',
          section: '二级',
          children: [
            {
              id: 129,
              value: 0,
              label: '创业法律顾问',
              section: '三级',
            },
            {
              id: 130,
              value: 1,
              label: '融资法律顾问',
              section: '三级',
            },
            {
              id: 131,
              value: 2,
              label: '企业法律顾问',
              section: '三级',
            }
          ]
        },
        {
          id: 132,
          value: 3,
          label: '法律专项',
          section: '二级',
          children: [
            {
              id: 133,
              value: 0,
              label: '代理诉讼',
              section: '三级',
            },
            {
              id: 134,
              value: 1,
              label: '纷争调解',
              section: '三级',
            },
            {
              id: 135,
              value: 2,
              label: '劳动仲裁',
              section: '三级',
            }
          ]
        }
      ]
    },
    {
      id: 136,
      value: 7,
      label: '人才服务',
      section: '一级',
      children: [
        {
          id: 137,
          value: 0,
          label: '人才招聘',
          section: '二级',
          children: [
            {
              id: 138,
              value: 0,
              label: '全职人才招聘',
              section: '三级',
            },
            {
              id: 139,
              value: 1,
              label: '兼职人才招聘',
              section: '三级',
            }
          ]
        },
        // {
        //   id: 140,
        //   value: 1,
        //   label: '人才培训',
        //   section: '二级',
        //
        // },
        {
          id: 141,
          value: 1,
          label: '企业服务',
          section: '二级',
          children: [
            {
              id: 142,
              value: 0,
              label: '企业拓展',
              section: '三级',
            },
            {
              id: 143,
              value: 1,
              label: '企业团建',
              section: '三级',
            },
            {
              id: 144,
              value: 2,
              label: '企业培训',
              section: '三级',
            }
          ]
        },
      ]
    },
    // {
    //   id: 140,
    //   value: 8,
    //   label: '金融服务',
    //   section: '一级',
    //   children: [
    //     {
    //       id: 141,
    //       value: 0,
    //       label: '金融服务',
    //       section: '二级',
    //       children: [
    //         {
    //           id: 142,
    //           value: 0,
    //           label: '金融服务',
    //           section: '三级',
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      id: 145,
      value: 8,
      label: '精选服务',
      section: '一级',
      children: [
        {
          id: 146,
          value: 0,
          label: '精选服务',
          section: '二级',
          children: [
            {
              id: 147,
              value: 0,
              label: '公司转让',
              section: '三级',
            },
            {
              id: 148,
              value: 1,
              label: '实体店铺交易',
              section: '三级',
            },{
              id: 149,
              value: 2,
              label: '虚拟店铺交易',
              section: '三级',
            },{
              id: 150,
              value: 3,
              label: '商标交易',
              section: '三级',
            },{
              id: 151,
              value: 4,
              label: '专利交易',
              section: '三级',
            },{
              id: 152,
              value: 5,
              label: '版权交易',
              section: '三级',
            },{
              id: 153,
              value: 6,
              label: '成功融资项目',
              section: '三级',
            }
          ]
        }
      ]
    }
    ]
}
