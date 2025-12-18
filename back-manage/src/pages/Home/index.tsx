import {
  ArrowRightOutlined,
  BarChartOutlined,
  CloudOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Button, Card, Divider, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const highlights = [
    {
      title: '云端安全',
      description: '全量数据加密存储与定期备份，保障问卷与答卷安全。',
      icon: <CloudOutlined />,
    },
    {
      title: '团队协作',
      description: '多角色权限管理，编辑、审核、发布一步到位。',
      icon: <TeamOutlined />,
    },
    {
      title: '高效洞察',
      description: '实时图表与导出支持，帮你快速沉淀结论与报告。',
      icon: <BarChartOutlined />,
    },
  ];

  const steps = [
    {
      title: '1 分钟创建',
      desc: '选择模板或拖拽题目，快速搭建结构。',
    },
    {
      title: '一键发布',
      desc: '链接、二维码、短信多渠道同步发布。',
    },
    {
      title: '实时追踪',
      desc: '收集进度与数据质量随时掌握，异常自动提示。',
    },
    {
      title: '智能分析',
      desc: '交叉分析、数据导出，助力决策与复盘。',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <Card className="overflow-hidden border-0 bg-linear-to-r from-blue-600 via-indigo-500 to-purple-500 text-white shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-6 py-4">
              <div className="flex flex-wrap items-center gap-3">
                <Tag color="gold" className="rounded-full px-3 py-1 text-base">
                  问卷星 · 专业版
                </Tag>
                <span className="rounded-full bg-white/15 px-3 py-1 text-sm">
                  高并发 · 高可用 · 高安全
                </span>
              </div>
              <div className="space-y-3">
                <Typography.Title level={2} className="mb-0! text-white!">
                  低门槛打造专业问卷
                </Typography.Title>
                <Typography.Paragraph className="mb-0! text-lg text-white/80">
                  从设计、发布到收集与分析，一站式完成；多渠道触达与实时统计，让每一次反馈都变成可用的决策资产。
                </Typography.Paragraph>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <SafetyCertificateOutlined />
                  <span>企业级安全合规</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThunderboltOutlined />
                  <span>百亿级响应能力</span>
                </div>
                <div className="flex items-center gap-2">
                  <TeamOutlined />
                  <span>多人实时协作</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-white/10 via-white/5 to-transparent blur-3xl" />
              <Card className="relative rounded-2xl border-0 bg-white text-gray-900 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <Typography.Text type="secondary">开始你的第一份问卷</Typography.Text>
                    <Typography.Title level={4} className="mb-0!">
                      三步完成，立即使用
                    </Typography.Title>
                  </div>
                  <Button
                    type="primary"
                    icon={<ArrowRightOutlined />}
                    onClick={() => navigate(token ? 'manage/list' : '/login')}
                  >
                    {token ? '进入系统' : '登录'}
                  </Button>
                </div>
                <Divider className="my-4!" />
                <div className="space-y-4">
                  {steps.map(item => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      <div>
                        <Typography.Text strong className="block text-base">
                          {item.title}
                        </Typography.Text>
                        <Typography.Paragraph className="mb-0! text-gray-600">
                          {item.desc}
                        </Typography.Paragraph>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Card>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {highlights.map(item => (
            <Card key={item.title} className="shadow-md">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <Typography.Text strong>{item.title}</Typography.Text>
                  <Typography.Paragraph className="mb-0! text-gray-600">
                    {item.description}
                  </Typography.Paragraph>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card className="shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Typography.Title level={4} className="mb-1!">
                  数据实时可视化
                </Typography.Title>
                <Typography.Text type="secondary">
                  多维度图表、交叉分析与导出，让数据更好读懂。
                </Typography.Text>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-slate-50 px-3 py-4">
                <div className="text-2xl font-semibold text-blue-600">120K+</div>
                <div className="text-sm text-gray-500">活跃问卷</div>
              </div>
              <div className="rounded-xl bg-slate-50 px-3 py-4">
                <div className="text-2xl font-semibold text-blue-600">98%</div>
                <div className="text-sm text-gray-500">发布成功率</div>
              </div>
              <div className="rounded-xl bg-slate-50 px-3 py-4">
                <div className="text-2xl font-semibold text-blue-600">24/7</div>
                <div className="text-sm text-gray-500">运维保障</div>
              </div>
            </div>
          </Card>

          <Card className="flex flex-col justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-600">
                高可用架构
              </div>
              <div className="rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-600">
                多端发布
              </div>
            </div>
            <Typography.Title level={4} className="mt-4!">
              贴合各类业务场景
            </Typography.Title>
            <Typography.Paragraph className="text-gray-600">
              支持调研、报名、投票、测评、收集表单等丰富场景，满足营销、运营、人力、教学等多部门需求。
            </Typography.Paragraph>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
              <span className="rounded-lg bg-slate-50 px-3 py-1">模板库</span>
              <span className="rounded-lg bg-slate-50 px-3 py-1">题库管理</span>
              <span className="rounded-lg bg-slate-50 px-3 py-1">防刷机制</span>
              <span className="rounded-lg bg-slate-50 px-3 py-1">数据导出</span>
              <span className="rounded-lg bg-slate-50 px-3 py-1">团队协作</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
