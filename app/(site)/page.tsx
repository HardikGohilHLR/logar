// Home
import { Profile } from '@/components/profile';

const page = async () => {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-xl leading-none font-medium text-gray-900">Profile</h1>
          <p className="flex items-center gap-2 text-sm font-normal text-gray-700">Personal Customization</p>
        </div>

        <Profile />
      </div>
    </>
  );
};

export default page;
