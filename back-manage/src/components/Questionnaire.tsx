import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Tag } from "antd";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router";

interface IProps {
  id: string;
  title: string;
  createdAt: string;
  answerCount: number;
  isPublished: boolean;
  isStar: boolean;
}

const Questionnaire = (props: IProps) => {
  const { id, title, createdAt, answerCount, isPublished, isStar } = props;
  const navigate = useNavigate();
  return (
    <div
      key={id}
      className="flex flex-col gap-4 bg-white p-4 rounded-2xl hover:shadow-md transition duration-300"
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          {isStar && <StarOutlined className="text-red-500!" />}
          <Link
            to={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}
          >
            {title}
          </Link>
        </div>
        <div className="flex gap-4">
          <span>
            {isPublished ? (
              <Tag color={"processing"} variant="outlined">
                已发布
              </Tag>
            ) : (
              <Tag color={"default"} variant="outlined">
                未发布
              </Tag>
            )}
          </span>
          <span>答卷：{answerCount || 0}</span>
          <span>
            {createdAt ? dayjs(createdAt).format("YYYY-MM-DD HH:mm") : "--"}
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-6">
          <Button
            type="link"
            icon={<EditOutlined />}
            className="p-0!"
            onClick={() => navigate("/question/edit/1")}
            disabled={isPublished}
          >
            编辑问卷
          </Button>
          <Button
            type="link"
            icon={<LineChartOutlined />}
            className="p-0!"
            onClick={() => navigate("/question/stat/1")}
          >
            问卷统计
          </Button>
        </div>
        <div className="flex gap-6">
          <Button type="link" icon={<StarOutlined />} className="p-0!">
            {isStar ? "取消标星" : "标星"}
          </Button>
          <Button type="link" icon={<CopyOutlined />} className="p-0!">
            复制
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} className="p-0!">
            删除
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
