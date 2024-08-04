const content = {
  pageType: "jh-page", pageId: "tool", pageName: "工具管理", 
  resourceList: [
    {
      actionId: "selectItemList",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅查询列表-tool",
      resourceData: {
        table: "tool",
        operation: "select"
      }
    },
    {
      actionId: "insertItem",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅添加-tool",
      resourceData: {
        table: "tool",
        operation: "jhInsert"
      }
    },
    {
      actionId: "updateItem",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅更新-tool",
      resourceData: {
        table: "tool",
        operation: "jhUpdate"
      }
    },
    {
      actionId: "deleteItem",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅删除-tool",
      resourceData: {
        table: "tool",
        operation: "jhDelete"
      }
    }
  ], // { actionId: '', resourceType: '', resourceData: {}, resourceHook: {}, desc: '' }
  headContent: [
    { tag: 'jh-page-title', value: "tool", attrs: { cols: 12, sm: 6, md:4 }, helpBtn: true, slot: [] },
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
      attrs: {  },
      colAttrs: { clos: 12 },
      cardAttrs: { class: 'rounded-lg elevation-0' },
      headActionList: [
        { tag: 'v-btn', value: '新增', attrs: { color: 'success', class: 'mr-2', '@click': 'doUiAction("startCreateItem")', small: true } },
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
        { text: "工具名称", value: "title", width: 80, sortable: true },
        { text: "工具图标", value: "logo", width: 80, sortable: true },
        { text: "工具描述", value: "desc", width: 80, sortable: true },
        { text: "工具链接", value: "url", width: 80, sortable: true },
        { text: "工具分类", value: "category", width: 80, sortable: true },
        { text: "操作", value: "operation", width: 80, sortable: true },
        { text: "操作者userId", value: "operationByUserId", width: 80, sortable: true },
        { text: "操作者用户名", value: "operationByUser", width: 80, sortable: true },
        { text: "操作时间", value: "operationAt", width: 80, sortable: true },
        { text: "操作", value: "action", type: "action", width: 'window.innerWidth < 500 ? 70 : 120', align: "center", class: "fixed", cellClass: "fixed" },

        // width 表达式需要使用字符串包裹
      ],
      value: [
        // vuetify table custom slot
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
            { label: "工具名称", model: "title", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "工具图标", model: "logo", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "工具描述", model: "desc", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "工具链接", model: "url", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "工具分类", model: "category", tag: "v-text-field", rules: "validationRules.requireRules",   },
        
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
            { label: "工具名称", model: "title", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "工具图标", model: "logo", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "工具描述", model: "desc", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "工具链接", model: "url", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "工具分类", model: "category", tag: "v-text-field", rules: "validationRules.requireRules",   },
        
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
        { label: "操作记录", type: "component", componentPath: "recordHistory", attrs: { table: 'tool', pageId: 'tool', ':id': 'updateItem.id' } },
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
    doUiAction: {}, // 额外uiAction { [key]: [action1, action2]}
    methods: {}
  },
  
};

module.exports = content;
