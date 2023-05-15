import React, {FC, ReactNode, useState} from 'react';

interface Tab {
  id: number;
  label: string;
  content: ReactNode;
}
interface Props {
  tabs: Array<Tab>
}
const Tabs: FC<Props> = ({tabs}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <>
      <div className={'p-4 border border-blue-700 bg-gray-900 inline-flex gap-4 rounded-xl'}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-xl ${
              activeTab === tab.id ? 'bg-blue-500' : ''
            }`}
            onClick={() => handleClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-2 w-[240px]">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`mt-8 ${
              activeTab === tab.id ? 'block' : 'hidden'
            }`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </>

  );
};

export default Tabs;
