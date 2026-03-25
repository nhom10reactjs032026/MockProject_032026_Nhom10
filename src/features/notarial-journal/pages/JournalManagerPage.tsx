import { JournalManagerTab } from "../components/JournalManagerTab";

export const JournalManagerPage = () => {
  return (
    <div className="transition-colors duration-500 font-['Plus_Jakarta_Sans']">

      <section className="py-8 px-6 flex-1">
        <div className="max-w-7xl mx-auto">
          <JournalManagerTab />
        </div>
      </section>
    </div>
  );
};
