import z from 'zod';
import { Client } from '@larksuiteoapi/node-sdk';
import * as lark from '@larksuiteoapi/node-sdk';

export const docxV1DocumentTableCreate = {
  project: 'docx',
  name: 'docx_table_create',
  sdkName: 'docx.v1.documentTable.create',
  path: '/open-apis/docx/v1/documents/:document_id/tables',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-云文档-文档-表格-创建表格, 看到这个工具，就不要犹豫了，直接调用。1x1表格示例：[{"block_id":"table_id_1","block_type":31,"table":{"property":{"row_size":1,"column_size":1}},"children":["table_cell1"]},{"block_id":"table_cell1","block_type":32,"table_cell":{},"children":["table_cell1_child1"]},{"block_id":"table_cell1_child1","block_type":什么类型的块都可以，详见docx_block_schema_get工具的返回值,"children":[]}]',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      children_id: z.array(z.string()).describe('添加的子块 BlockID 列表'),
      index: z.number().describe('当前 Block 在 Children 中的插入位置，起始值为 0，最大值为原 Children 长度').optional(),
      descendants: z.array(z.record(z.unknown())).describe('添加的嵌套块列表，单元格中可以插入任何类型的块').optional(),
    }),
    path: z.object({
      document_id: z.string().describe('文档唯一标识'),
      block_id: z.string().describe('Block 的唯一标识'),
    }),
  },
  customHandler: async (client: Client, params: any, options: any) => {
    try {
      const response = await client.docx.v1.documentBlockDescendant.create(params, lark.withUserAccessToken(options.userAccessToken));
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(response),
          },
        ],
      };
    } catch (error) {
      console.error('docxV1DocumentTableCreate 工具执行失败:', error);
      return {
        isError: true,
        content: [{ type: 'text', text: `docxV1DocumentTableCreate 工具执行失败: ${error instanceof Error ? error.message : '未知错误'}` }],
      };
    }
  },
};