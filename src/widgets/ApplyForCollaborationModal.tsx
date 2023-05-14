import React, {FC} from 'react';
import {useForm} from 'react-hook-form';
import {Modal} from 'flowbite-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  collaborationAuthor: string;
}

interface FormData {
  skills: string;
}

const CreateCollaborationModal: FC<Props> = ({isOpen, onClose, onSubmit, collaborationAuthor}) => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>();

  const handleClose = () => {
    reset();
    onClose();
  }
  const onFormSubmit = handleSubmit((data) => {
    onSubmit(data);
    handleClose();
  });

  return (
    <Modal show={isOpen} onClose={handleClose} size="xl" popup={true}>
      <Modal.Header className="bg-white"/>
      <Modal.Body className="bg-white">
        <div className="p-8">
          <h3 className="mb-8 text-xl font-thin">
            <span className={'font-bold'}>{collaborationAuthor}</span> required a bit of information from you to start collaboration
          </h3>

          <form onSubmit={onFormSubmit}>
            <div className="flex flex-col gap-4 mb-8">
              <label className="flex flex-col gap-2">
                <span className="text-base">Please list relevant skills or experience that you bring to this collaboration:</span>
                <input
                  placeholder={'Type in...'}
                  type="text"
                  {...register('skills', {required: true})}
                  className="border rounded-lg p-2"
                />
                {errors.skills && <span className={'text-red-700'}>This field is required.</span>}
              </label>

            </div>

              <button
                type="submit"
                className="w-full py-2 px-4 text-blue-700 border border-blue-700 uppercase rounded-xl disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400"
              >
                Submit
              </button>

          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCollaborationModal;
