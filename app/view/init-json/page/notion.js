const content = {
  pageType: "jh-page", pageId: "admin/notion", pageName: "notion页面", 
  resourceList: [
    {
      actionId: "selectItemList",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅查询列表-notion",
      resourceData: {
        table: "notion",
        operation: "select"
      }
    },
    {
      actionId: "insertItem",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅添加-notion",
      resourceData: {
        table: "notion",
        operation: "jhInsert"
      }
    },
    {
      actionId: "updateItem",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅更新-notion",
      resourceData: {
        table: "notion",
        operation: "jhUpdate"
      }
    },
    {
      actionId: "deleteItem",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅删除-notion",
      resourceData: {
        table: "notion",
        operation: "jhDelete"
      }
    },
    {
      actionId: "syncNotionData",
      resourceType: "service",
      resourceHook: {},
      desc: "✅删除-notion",
      resourceData: {"service": "notion", "serviceFunction": "fetchAndSyncNotionData"}
    },
    {
      actionId: "syncNotion",
      resourceType: "service",
      resourceHook: {},
      desc: "✅删除-notion",
      resourceData: {"service": "notion", "serviceFunction": "syncNotion"}
    }
  ], // { actionId: '', resourceType: '', resourceData: {}, resourceHook: {}, desc: '' }
  headContent: [
    { tag: 'jh-page-title', value: "notion", attrs: { cols: 12, sm: 6, md:4 }, helpBtn: true, slot: [] },
    { tag: 'v-spacer' },
    { 
      tag: 'jh-search', 
      attrs: { cols: 12, sm: 6, md:8 },
      value: [
        { tag: "v-text-field", model: "serverSearchWhereLike.className", attrs: {prefix: '前缀'} },
      ], 
      searchBtn: true
    }
  ],
  pageContent: [
    {
      tag: 'jh-table',
      attrs: {
        'show-select': true,
        'v-model': 'selectedItems',
      },
      colAttrs: { clos: 12 },
      cardAttrs: { class: 'rounded-lg elevation-0' },
      headActionList: [
        { tag: 'v-btn', value: '同步notion数据', attrs: { color: 'success', class: 'mr-2', '@click': 'doUiAction("syncNotionData")', small: true } },
        { tag: 'v-btn', value: '同步到tool', attrs: { color: 'success', class: 'mr-2', '@click': 'doUiAction("syncNotion")', small: true } },
        { tag: 'v-spacer' },
        // 默认筛选
        {
          tag: 'v-col',
          attrs: { cols: '12', sm: '6', md: '3', xs: 8, class: 'pa-0' },
          value: [
            { tag: 'v-text-field', attrs: {prefix: '筛选', 'v-model': 'searchInput', class: 'jh-v-input', ':dense': true, ':filled': true, ':single-line': true} },
          ],
        }
      ],
      headers: [
        { text: "id", value: "id", width: 80, sortable: true, class: "fixed", cellClass: "fixed" },
        { text: "名称", value: "title", width: 80, sortable: true },
        { text: "logo", value: "logo", width: 80, sortable: true },
        { text: "分类", value: "category", width: 80, sortable: true },
        { text: "标签", value: "tag", width: 80, sortable: true },
        { text: "描述", value: "desc", width: 80, sortable: true },
        { text: "链接", value: "url", width: 80, sortable: true },
        { text: "创建时间", value: "createAt", width: 80, sortable: true },
        { text: "操作", value: "operation", width: 80, sortable: true },
        { text: "操作者userId", value: "operationByUserId", width: 80, sortable: true },
        { text: "操作者用户名", value: "operationByUser", width: 80, sortable: true },
        { text: "操作时间", value: "operationAt", width: 80, sortable: true },
        { text: "操作", value: "action", type: "action", width: 'window.innerWidth < 500 ? 70 : 120', align: "center", class: "fixed", cellClass: "fixed" },

        // width 表达式需要使用字符串包裹
      ],
      value: [
        `
         <template v-slot:item.title="{ item }">
            <v-avatar
              size="30"
            >
            <img :src="item.logo" />
            </v-avatar>
            {{item.title}}
          </template>
        `
      ],
      rowActionList: [
        { text: '编辑', icon: 'mdi-note-edit-outline', color: 'success', click: 'doUiAction("startUpdateItem", item)' }, // 简写支持 pc 和 移动端折叠
        { text: '删除', icon: 'mdi-trash-can-outline', color: 'error', click: 'doUiAction("deleteItem", item)' } // 简写支持 pc 和 移动端折叠
      ],
    }
  ],
  actionContent: [
    {
      tag: 'jh-create-drawer',
      key: "create",
      attrs: {},
      title: '新增',
      headSlot: [
        { tag: 'v-spacer'}
      ],
      contentList: [
        { 
          label: "新增", 
          type: "form", 
          formItemList: [
            { label: "id", model: "id", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "名称", model: "title", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "logo", model: "logo", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "分类", model: "category", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "标签", model: "tag", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "描述", model: "desc", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "链接", model: "url", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "创建时间", model: "createAt", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "操作", model: "operation", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "操作者userId", model: "operationByUserId", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "操作者用户名", model: "operationByUser", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "操作时间", model: "operationAt", tag: "v-text-field", rules: "validationRules.requireRules",   },

          ], 
          action: [{
            tag: "v-btn",
            value: "新增",
            attrs: {
              color: "success",
              ':small': true,
              '@click': "doUiAction('createItem')"
            }
          }],
        },

      ]
    },
    {
      tag: 'jh-update-drawer',
      key: "update",
      attrs: {},
      title: '编辑',
      headSlot: [
        { tag: 'v-spacer'}
      ],
      contentList: [
        { 
          label: "编辑", 
          type: "form", 
          formItemList: [
            { label: "id", model: "id", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "名称", model: "title", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "logo", model: "logo", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "分类", model: "category", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "标签", model: "tag", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "描述", model: "desc", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "链接", model: "url", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "创建时间", model: "createAt", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "操作", model: "operation", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "操作者userId", model: "operationByUserId", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "操作者用户名", model: "operationByUser", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "操作时间", model: "operationAt", tag: "v-text-field", rules: "validationRules.requireRules",   },

          ], 
          action: [{
            tag: "v-btn",
            value: "编辑",
            attrs: {
              color: "success",
              ':small': true,
              '@click': "doUiAction('updateItem')"
            }
          }],
        },
        { label: "操作记录", type: "component", componentPath: "recordHistory", attrs: { table: 'notion', pageId: 'notion', ':id': 'updateItem.id' } },
      ]
    },
  ],
  includeList: [], // { type: < js | css | html | vueComponent >, path: ''}
  common: { 
    
    data: {
      constantObj: {},
      validationRules: {
        requireRules: [
          v => !!v || '必填',
        ],
      },
      serverSearchWhereLike: { className: '' }, // 服务端like查询
      serverSearchWhere: { }, // 服务端查询
      serverSearchWhereIn: { }, // 服务端 in 查询
      filterMap: {}, // 结果筛选条件

      selectedItems: [],
    },
    dataExpression: {
      isMobile: 'window.innerWidth < 500'
    }, // data 表达式
    watch: {},
    computed: {
      tableDataComputed() {
        if(this.filterMap) {
          return this.tableData.filter(row => {
            for (const key in this.filterMap) {
              if (this.filterMap[key] && row[key] !== this.filterMap[key]) {
                return false;
              }
            }
            return true;
          });
        } else {
          return this.tableData;
        }
      },
    },
    doUiAction: {
      syncNotionData: ['syncNotionData'],
      syncNotion: ['syncNotion'],
    }, // 额外uiAction { [key]: [action1, action2]}
    methods: {
      async syncNotionData() {
        window.vtoast.loading('同步中...')
        await window.jianghuAxios({
          data: {
            appData: {
              pageId: 'admin/notion',
              actionId: 'syncNotionData',
              actionData: {},
              orderBy: [{column: 'operationAt', order: 'desc'}]
            }
          }
        })
        window.vtoast.success('同步成功')
      },
      async syncNotion() {
        window.vtoast.loading('同步中...')
        await window.jianghuAxios({
          data: {
            appData: {
              pageId: 'admin/notion',
              actionId: 'syncNotion',
              actionData: {
                idList: this.selectedItems.map(item => item.id)
              },
              orderBy: [{column: 'operationAt', order: 'desc'}]
            }
          }
        })
        window.vtoast.success('同步成功')
      }
    }
  },
  
};

module.exports = content;
