class Api::ProspectsFilesController < ApplicationController
  def import
    prospect_file = ProspectsFile.create({
      **prospect_file_params,
      user_id: @user_id
    })
  end

  def progress
    # insert error handling etc. 
    prospect_file = ProspectsFile.find(params[:id])
    puts prospect_file.inspect
    render json: {
      total: prospect_file.total,
      done: prospect_file.done
    }
  end

  def prospect_file_params
    params.require(:email_index).permit(:first_name_index?, :last_name_index?, :force?, :has_headers?)
  end
end
