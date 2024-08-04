CREATE TABLE `tool` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '工具名称',
  `logo` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '工具图标',
  `desc` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '工具描述',
  `url` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '工具链接',
  `category` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '工具分类',
  `operation` varchar(255) COLLATE utf8mb4_bin DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;